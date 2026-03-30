"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function getLocalizedPath(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-saffron-200 bg-saffron-50 p-1">
      <Link
        href={getLocalizedPath("en")}
        className={`rounded px-3 py-1 text-sm font-semibold transition-colors ${
          locale === "en"
            ? "bg-saffron-500 text-white"
            : "text-saffron-700 hover:bg-saffron-100"
        }`}
      >
        EN
      </Link>
      <Link
        href={getLocalizedPath("te")}
        className={`rounded px-3 py-1 text-sm font-semibold transition-colors ${
          locale === "te"
            ? "bg-saffron-500 text-white"
            : "text-saffron-700 hover:bg-saffron-100"
        }`}
      >
        తె
      </Link>
    </div>
  );
}
