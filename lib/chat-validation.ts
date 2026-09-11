import { z } from "zod";

export const MAX_REQUEST_BYTES = 48000;
const messageSchema = z.object({
  id: z.string().min(1).max(120),
  role: z.enum(["user", "assistant"]),
  parts: z.array(z.object({ type: z.literal("text"), text: z.string().min(1).max(6000) }).strict()).min(1).max(1),
}).strict();
export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
}).strict().superRefine(({ messages }, ctx) => {
  if (messages.at(-1)?.role !== "user") ctx.addIssue({ code: "custom", message: "Last message must be from user" });
  if (messages.reduce((sum,m) => sum+m.parts[0].text.length,0) > 20000) ctx.addIssue({ code: "custom", message: "Conversation too long; reset chat" });
  if (new Set(messages.map(m => m.id)).size !== messages.length) ctx.addIssue({ code: "custom", message: "Duplicate message IDs" });
  if (messages.some(m => m.role === "user" && m.parts[0].text.length > 2000)) ctx.addIssue({ code: "custom", message: "Question exceeds 2000 characters" });
});
export async function readBoundedJson(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("Expected application/json");
  if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) throw new Error("Request too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Empty request");
  let size = 0;
  let text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) { await reader.cancel(); throw new Error("Request too large"); }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally { reader.releaseLock(); }
}
export function safeAIError(error: unknown) {
  const text = error instanceof Error ? `${error.name} ${error.message}` : "";
  if (/credit|balance|quota|payment.required|402/i.test(text)) return "AI Gateway usage is unavailable. Check the project's Gateway credits and spending limits, then retry.";
  if (/unauthor|auth|credential|401|403/i.test(text)) return "AI Gateway authorization is unavailable for this environment. Check the project's connected Gateway configuration, then retry.";
  if (/timeout|abort/i.test(text)) return "The AI request timed out or was stopped. Please try a shorter question.";
  if (/429|rate.limit/i.test(text)) return "The AI service is busy. Wait a moment, then retry.";
  return "The live AI service could not complete this response. Please retry. No financial action was performed.";
}
