import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MemberGrid from "@/components/committee/MemberGrid";
import { getMembersByGroup, getGroupTranslationKey, validGroups } from "@/lib/members";

interface Props {
  params: Promise<{ locale: string; group: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "te"];
  return locales.flatMap((locale) =>
    validGroups.map((group) => ({ locale, group }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, group } = await params;
  const key = getGroupTranslationKey(group);
  if (!key) return {};
  const t = await getTranslations({ locale, namespace: `members.${key}` });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function MemberGroupPage({ params }: Props) {
  const { locale, group } = await params;
  const key = getGroupTranslationKey(group);
  const members = getMembersByGroup(group);

  if (!key || !members) notFound();

  const t = await getTranslations({ locale, namespace: `members.${key}` });

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading title={t("title")} />
        <MemberGrid members={members} locale={locale} />
      </Container>
    </section>
  );
}
