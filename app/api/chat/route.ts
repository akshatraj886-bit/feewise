import { createAgentUIStreamResponse } from "ai";
import { financeAgent } from "@/lib/finance-agent";
import { chatRequestSchema, readBoundedJson, safeAIError } from "@/lib/chat-validation";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = chatRequestSchema.safeParse(await readBoundedJson(request));
  } catch {
    return new Response("Invalid or oversized JSON request. Limit questions to 2,000 characters and reset long conversations.", { status: 400 });
  }
  if (!parsed.success) return new Response("Invalid chat history. Only text questions are accepted. Reset long conversations and try again.", { status: 400 });
  try {
    return await createAgentUIStreamResponse({
      agent: financeAgent,
      uiMessages: parsed.data.messages,
      abortSignal: request.signal,
      timeout: 50000,
      headers: { "Cache-Control": "no-store" },
      onError: safeAIError,
    });
  } catch (error) {
    return new Response(safeAIError(error), { status: 503 });
  }
}
