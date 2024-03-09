import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ChakraProvider } from "@chakra-ui/react";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Révise",
  description: "LE site pour Réviser",
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
          <Suspense>
            {children}
          </Suspense>
        </ChakraProvider>
        <Toaster/>
      </body>
    </html>
  );
}
