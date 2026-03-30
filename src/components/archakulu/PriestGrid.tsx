import PriestCard from "./PriestCard";
import type { Archakulu } from "@/types/archakulu";

interface PriestGridProps {
  priests: Archakulu[];
  locale: string;
}

export default function PriestGrid({ priests, locale }: PriestGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {priests.map((priest) => (
        <PriestCard key={priest.id} priest={priest} locale={locale} />
      ))}
    </div>
  );
}
