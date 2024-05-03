import * as React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/front-end/header";
import { SendFeedback } from "@/components/front-end/send-feedback";

export const metadata: Metadata = {
  title: "Linker | All Links in One Place",
  description:
    "Revolutionize your LinkedIn presence with daily AI-generated posts.Elevate engagement effortlessly with our freemium ai tool!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <SendFeedback />
        </ThemeProvider>
      </body>
    </html>
  );
}
