import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Prassananjaneya Swamy Devalayam",
  description:
    "Official website of Sri Prassananjaneya Swamy Devalayam, Narsingi - Events, Gallery and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

