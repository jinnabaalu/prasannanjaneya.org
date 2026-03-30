import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Music, Sun, Star, Sparkles, Flame } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getMarkdownContent } from "@/lib/markdown";

const activities = [
  { titleKey: "activity1Title", descKey: "activity1Desc", Icon: Music },
  { titleKey: "activity2Title", descKey: "activity2Desc", Icon: Sun },
  { titleKey: "activity3Title", descKey: "activity3Desc", Icon: Star },
  { titleKey: "activity4Title", descKey: "activity4Desc", Icon: Sparkles },
  { titleKey: "activity5Title", descKey: "activity5Desc", Icon: Flame },
] as const;

export default function AboutSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const { content } = getMarkdownContent(`content/${locale}/about.md`);

  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/gallery/about-background.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <Container className="relative z-10">
        <SectionHeading title={t("aboutTitle")} />
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Image on the left */}
          <div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/gallery/vigraham.png"
                alt="Sri Prassananjaneya Swamy"
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text on the right */}
          <div className="text-lg leading-relaxed text-gray-700 lg:text-xl">
            {content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* Activities Cards */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-saffron-800 sm:text-3xl">
            {t("activitiesTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {activities.map(({ titleKey, descKey, Icon }) => (
              <div
                key={titleKey}
                className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl border border-saffron-200 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-saffron-400"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600 transition-colors group-hover:bg-saffron-600 group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-saffron-900">
                  {t(titleKey)}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
