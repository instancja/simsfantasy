import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEVERSE",
  description: "A private world that lives its own life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
