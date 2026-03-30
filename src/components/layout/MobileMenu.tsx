"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

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

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [membersExpanded, setMembersExpanded] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-temple-maroon"
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-saffron-100 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                onClick={() => setOpen(false)}
                className="border-b border-saffron-50 py-3 text-lg font-medium text-temple-maroon transition-colors hover:text-saffron-600"
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Members expandable section */}
            <button
              onClick={() => setMembersExpanded(!membersExpanded)}
              className="flex items-center justify-between border-b border-saffron-50 py-3 text-lg font-medium text-temple-maroon transition-colors hover:text-saffron-600"
            >
              {t("members")}
              <ChevronDown size={20} className={`transition-transform ${membersExpanded ? "rotate-180" : ""}`} />
            </button>
            {membersExpanded && (
              <div className="flex flex-col bg-saffron-50/50">
                {memberSubmenus.map((sub) => (
                  <Link
                    key={sub.key}
                    href={`/${locale}${sub.href}`}
                    onClick={() => setOpen(false)}
                    className="border-b border-saffron-50 py-3 pl-6 text-base text-temple-maroon transition-colors hover:text-saffron-600"
                  >
                    {t(sub.key)}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
