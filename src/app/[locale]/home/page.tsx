import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroBanner from "@/components/home/HeroBanner";
import AboutSection from "@/components/home/AboutSection";
import QuickLinks from "@/components/home/QuickLinks";
import LocationSection from "@/components/home/LocationSection";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: locale === "te" ? "te_IN" : "en_IN",
      type: "website",
      images: [{ url: "/images/gallery/vigraham.png", width: 1200, height: 630, alt: t("metaTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/gallery/vigraham.png"],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <QuickLinks />
      <LocationSection />
    </>
  );
}
