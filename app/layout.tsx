import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
// import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* <Toaster /> */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
