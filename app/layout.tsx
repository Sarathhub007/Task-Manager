import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./Layout/navabar";

export const metadata: Metadata = {
  title: "TaskBoard",
  description: "Organize your tasks, stay focused, and get things done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />

        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
}