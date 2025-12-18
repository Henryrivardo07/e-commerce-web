// app/layout.tsx
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js app with TanStack Query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
