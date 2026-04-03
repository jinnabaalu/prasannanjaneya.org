import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import YouTubeSection from "@/components/gallery/YouTubeSection";
import { galleryImages, youtubeVideos, youtubeChannelUrl } from "@/lib/gallery";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
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

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading title={t("title")} />

        {/* Photos */}
        <div className="mb-16">
          <h3 className="mb-6 text-2xl font-bold text-saffron-600">
            {t("photosTitle")}
          </h3>
          <PhotoGallery images={galleryImages} />
        </div>

        {/* YouTube */}
        <div>
          <h3 className="mb-6 text-2xl font-bold text-saffron-600">
            {t("videosTitle")}
          </h3>
          <YouTubeSection
            videos={youtubeVideos}
            channelUrl={youtubeChannelUrl}
          />
        </div>
      </Container>
    </section>
  );
}
