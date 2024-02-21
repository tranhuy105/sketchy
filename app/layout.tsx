import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";


export const metadata: Metadata = {
  title: "Sketchy",
  description: "A simple all in one ultilities app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("", inter.className)}>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
