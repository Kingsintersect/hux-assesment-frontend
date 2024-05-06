import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | HUX Contact Registry',
    default: 'HUX Contact Registry',
  },
  description: "Create and manage contact informations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center justify-between pb-10">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
