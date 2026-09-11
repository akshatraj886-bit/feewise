import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import { LiveFinanceProvider } from "@/context/live-finance-context";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
export const metadata: Metadata = {
  title: "finDeck — Vignan's Foundation for Science, Technology & Research (VFSTR)",
  description:
    "finDeck: Official University Finance Command Center — Vignan's Foundation for Science, Technology & Research (Deemed to be University). Automated fee demand, concessions, priority allocations & digital certificates.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <LiveFinanceProvider>{children}</LiveFinanceProvider>
          </AuthProvider>
          <Toaster position="bottom-right" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}

