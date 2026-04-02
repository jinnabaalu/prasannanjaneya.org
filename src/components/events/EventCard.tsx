import Card from "@/components/ui/Card";
import { Calendar, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const locale = useLocale();
  const t = useTranslations("events");

  return (
    <Card>
      <Link
        href={`/${locale}/events/${event.slug}`}
        className="flex items-start gap-4"
      >
        <div className="flex shrink-0 flex-col items-center rounded-lg bg-saffron-50 p-3">
          <Calendar size={24} className="text-saffron-500" />
          <span className="mt-1 text-xs font-semibold text-saffron-700">
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-temple-maroon">
            {event.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-2 text-gray-700">{event.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-saffron-600">
            {t("viewDetails")} <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </Card>
  );
}
