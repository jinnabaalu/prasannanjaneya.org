import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MemberGrid from "@/components/committee/MemberGrid";
import { getCommitteeMembers } from "@/lib/committee";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "committee" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CommitteePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "committee" });
  const members = getCommitteeMembers();

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading title={t("title")} />
        <MemberGrid members={members} locale={locale} />
      </Container>
    </section>
  );
}
