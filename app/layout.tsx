import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "30 Days of 30 Projects",
  description:
    "One cool mini project each day using the latest tech stack for the next 30 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DGKZLEWN8J"
        ></Script>
        <Script id="google-analytics">
          {`
   window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DGKZLEWN8J');
  `}
        </Script>
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
