import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { MapPin, Phone, Mail, PlayCircle } from "lucide-react";

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
                Sri Prassananjaneya Swamy Devalayam
                <br />
                Narsingi, Papannapet
                <br />
                Medak, Telangana, India - 502302
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-saffron-100">
              <Phone size={16} className="shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-saffron-100">
              <Mail size={16} className="shrink-0" />
              <span>info@pabbathianjaneya.org</span>
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
              href="https://www.youtube.com/@pabbathianjaneya"
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
