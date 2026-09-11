import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
export const metadata: Metadata = {
  title: "FEEWISE AI — University Finance Command Center",
  description:
    "Agent 40 — An intelligent university fee-management demo. Explore fee demand, student balances, reconciliation and human-reviewed refund recommendations.",
};
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f8fc",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`light bg-background ${geist.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster theme="light" position="bottom-right" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
