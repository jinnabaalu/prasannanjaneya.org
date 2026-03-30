import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Calendar, Users, Book, Camera } from "lucide-react";

const links = [
  { key: "events", href: "/events", icon: Calendar, color: "text-saffron-500" },
  { key: "bajanaBrundham", href: "/members/bajana-brundham", icon: Users, color: "text-blue-600" },
  { key: "archakulu", href: "/members/archakulu", icon: Book, color: "text-temple-maroon" },
  { key: "gallery", href: "/gallery", icon: Camera, color: "text-green-600" },
] as const;

export default function QuickLinks() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-saffron-50 py-16">
      <Container>
        <SectionHeading title={t("home.quickLinksTitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.key} href={`/${locale}${link.href}`}>
                <Card className="flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                  <Icon size={40} className={link.color} />
                  <h3 className="mt-4 text-lg font-semibold text-temple-maroon">
                    {t(`nav.${link.key}`)}
                  </h3>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
