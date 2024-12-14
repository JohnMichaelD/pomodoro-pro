import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";
import { Monofett } from "next/font/google"

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

const monofett = Monofett({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-monofett',
});

export const metadata: Metadata = {
  title: "Pomodoro Buddy",
  description: "Stay productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monofett.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
