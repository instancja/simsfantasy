import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEVERSE",
  description: "Prywatny świat, który żyje własnym życiem.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
