/**
 * This is the root layout component for the Next.js application. It sets up the HTML structure, including the `<html>` and `<body>` tags, and applies the Inter font from Google Fonts. It also imports the global CSS file and the Toaster component from the UI library.
 *
 * The `metadata` object defines the title and description of the application, which are used by Next.js for SEO purposes.
 *
 * The `RootLayout` component is the main layout component that wraps the entire application. It receives the `children` prop, which contains the content of the current page, and renders it within the layout structure.
 *
 * The Toaster component is rendered at the end of the body, providing a global notification system for the application.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ram Manohar Mishra | Know about me",
  description: "RMM Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
