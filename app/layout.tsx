import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: 'NJ Electronics',
    template: '%s | NJ Electronics',
  },
  description: 'Your one-stop shop for all electronics needs',
  keywords: ['electronics', 'gadgets', 'technology', 'online store'],
  authors: [{ name: 'NJ Electronics Team' }],
  creator: 'NJ Electronics',
  publisher: 'NJ Electronics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://utfs.io/f/EAWqchXM7I0K3fu7R7k8gFedUn4z5ksfKGyjwBXulr73ahWR" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-black dark:text-white`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Suspense>{children}</Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
