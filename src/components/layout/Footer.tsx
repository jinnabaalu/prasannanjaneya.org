import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { MapPin, Phone, PlayCircle } from "lucide-react";

const navLinks = [
  { key: "home", href: "/home" },
  { key: "events", href: "/events" },
  { key: "bajanaBrundham", href: "/members/bajana-brundham" },
  { key: "archakulu", href: "/members/archakulu" },
  { key: "executiveBoard", href: "/members/executive-board" },
  { key: "devalayaCommittee", href: "/members/devalaya-committee" },
  { key: "gallery", href: "/gallery" },
] as const;

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="border-t border-saffron-100 bg-temple-maroon text-white">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Address */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-temple-gold">
              {t("footer.address")}
            </h3>
            <div className="flex gap-2 text-sm text-saffron-100">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <p>
                {t("home.addressLine1")}
                <br />
                {t("home.addressLine2")}
                <br />
                {t("home.addressLine3")}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-saffron-100">
              <Phone size={16} className="shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-temple-gold">
              {t("footer.quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-sm text-saffron-100 transition-colors hover:text-temple-gold"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-temple-gold">
              {t("footer.followUs")}
            </h3>
            <a
              href="https://www.youtube.com/@%E0%B0%B6%E0%B1%8D%E0%B0%B0%E0%B1%80%E0%B0%AA%E0%B1%8D%E0%B0%B0%E0%B0%B8%E0%B0%A8%E0%B1%8D%E0%B0%A8%E0%B0%BE%E0%B0%82%E0%B0%9C%E0%B0%A8%E0%B1%87%E0%B0%AF%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%BE%E0%B0%AE%E0%B0%BF%E0%B0%A6%E0%B1%87%E0%B0%B5%E0%B0%BE%E0%B0%B2%E0%B0%AF%E0%B0%82-%E0%B0%A8%E0%B0%BE%E0%B0%B0%E0%B1%8D%E0%B0%B8%E0%B0%BF%E0%B0%82%E0%B0%97%E0%B0%BF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              <PlayCircle size={20} />
              YouTube
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-saffron-900 pt-6 text-center text-sm text-saffron-200">
          {t("footer.copyright")}
        </div>
      </Container>
    </footer>
  );
}
