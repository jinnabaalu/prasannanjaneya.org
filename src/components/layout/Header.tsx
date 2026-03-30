"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import HangingBells from "./HangingBells";

const navLinks = [
  { key: "home", href: "/home" },
  { key: "events", href: "/events" },
  { key: "gallery", href: "/gallery" },
] as const;

const memberSubmenus = [
  { key: "bajanaBrundham", href: "/members/bajana-brundham" },
  { key: "archakulu", href: "/members/archakulu" },
  { key: "executiveBoard", href: "/members/executive-board" },
  { key: "devalayaCommittee", href: "/members/devalaya-committee" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [membersOpen, setMembersOpen] = useState(false);

  function isActive(href: string) {
    return pathname === `/${locale}${href}`;
  }

  const isMembersActive = pathname.startsWith(`/${locale}/members`);

  return (
    <header className="sticky top-0 z-40 border-b border-saffron-100 bg-white/95 backdrop-blur overflow-visible">
      <HangingBells />
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}/home`}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/gallery/logo.png"
              alt="Temple Logo"
              width={64}
              height={64}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <div>
              <span className="block text-lg font-bold leading-tight text-temple-maroon sm:text-xl">
                {locale === "te"
                  ? "శ్రీ ప్రసన్నాంజనేయ"
                  : "Sri Prassananjaneya"}
              </span>
              <span className="block text-xs text-saffron-600">
                {locale === "te" ? "స్వామి దేవాలయం, నార్సింగి" : "Swamy Devalayam, Narsingi"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-saffron-500 text-white"
                    : "text-temple-maroon hover:bg-saffron-50 hover:text-saffron-600"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Members Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMembersOpen(true)}
              onMouseLeave={() => setMembersOpen(false)}
            >
              <button
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isMembersActive
                    ? "bg-saffron-500 text-white"
                    : "text-temple-maroon hover:bg-saffron-50 hover:text-saffron-600"
                }`}
              >
                {t("members")}
                <ChevronDown size={16} className={`transition-transform ${membersOpen ? "rotate-180" : ""}`} />
              </button>
              {membersOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-saffron-100 bg-white py-2 shadow-lg">
                  {memberSubmenus.map((sub) => (
                    <Link
                      key={sub.key}
                      href={`/${locale}${sub.href}`}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(sub.href)
                          ? "bg-saffron-50 font-medium text-saffron-700"
                          : "text-temple-maroon hover:bg-saffron-50 hover:text-saffron-600"
                      }`}
                    >
                      {t(sub.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Language Switcher (Desktop) + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
