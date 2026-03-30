import { useTranslations } from "next-intl";
import EventCard from "./EventCard";
import type { Event } from "@/types/event";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  const t = useTranslations("events");
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="space-y-10">
      {upcoming.length > 0 && (
        <div>
          <h3 className="mb-4 text-2xl font-bold text-saffron-600">
            {t("upcoming")}
          </h3>
          <div className="space-y-4">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-500">
            {t("past")}
          </h3>
          <div className="space-y-4 opacity-75">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <p className="text-center text-lg text-gray-500">{t("noEvents")}</p>
      )}
    </div>
  );
}
