import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EventList from "@/components/events/EventList";
import { getEvents } from "@/lib/events";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
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

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  const events = getEvents(locale);

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading title={t("title")} />
        <EventList events={events} />
      </Container>
    </section>
  );
}
