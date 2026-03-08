import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { AuthenticatedChatbot } from "@/components/authenticated-chatbot";
import { NuqsProvider } from "@/components/nuqs-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIT.AI",
  description: "O app que vai transformar a forma como você treina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <NuqsProvider>
            {children}
            <AuthenticatedChatbot />
          </NuqsProvider>
        </Suspense>
      </body>
    </html>
  );
}
