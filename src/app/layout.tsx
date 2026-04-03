import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://pabbathianjaneya.org";
const DEFAULT_OG_IMAGE = "/images/gallery/vigraham.png";
const SITE_NAME = "Sri Prassananjaneya Swamy Devalayam";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official website of Sri Prassananjaneya Swamy Devalayam, Narsingi - Events, Gallery and more.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "te_IN",
    alternateLocale: "en_IN",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

