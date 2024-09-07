import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whisperoo",
  description: "Whisperoo is an AI-powered anonymous messaging platform that lets you send and receive secret messages while preserving privacy. Share anonymously on social media and enjoy creative AI suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      </AuthProvider>
    </html>
    
  );
}
