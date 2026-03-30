import Card from "@/components/ui/Card";
import { Calendar } from "lucide-react";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="flex shrink-0 flex-col items-center rounded-lg bg-saffron-50 p-3">
          <Calendar size={24} className="text-saffron-500" />
          <span className="mt-1 text-xs font-semibold text-saffron-700">
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        <div>
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
        </div>
      </div>
    </Card>
  );
}
