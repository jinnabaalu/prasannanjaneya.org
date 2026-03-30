import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PriestGrid from "@/components/archakulu/PriestGrid";
import { getArchakulu } from "@/lib/archakulu";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "archakulu" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ArchakuluPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "archakulu" });
  const priests = getArchakulu();

  return (
    <section className="bg-saffron-50 py-16">
      <Container>
        <SectionHeading title={t("title")} />
        <PriestGrid priests={priests} locale={locale} />
      </Container>
    </section>
  );
}
