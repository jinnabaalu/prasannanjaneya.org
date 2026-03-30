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
