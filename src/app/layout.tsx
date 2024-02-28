import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ChakraProvider } from "@chakra-ui/react";


export const metadata: Metadata = {
  title: "Rev",
  description: "LE site pour Rev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <Toaster/>
      </body>
    </html>
  );
}
