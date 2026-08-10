import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../provider";

export const metadata: Metadata = {
  title: {
    default: "Paywall for Business",
    template: "%s | Paywall",
  },
  description: "A calm, clear workspace for managing digital payments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
