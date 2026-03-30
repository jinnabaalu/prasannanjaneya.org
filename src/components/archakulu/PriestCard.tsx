import Image from "next/image";
import Card from "@/components/ui/Card";
import { User } from "lucide-react";
import type { Archakulu } from "@/types/archakulu";

interface PriestCardProps {
  priest: Archakulu;
  locale: string;
}

export default function PriestCard({ priest, locale }: PriestCardProps) {
  const name = locale === "te" ? priest.name.te : priest.name.en;
  const title = locale === "te" ? priest.title.te : priest.title.en;
  const bio = priest.bio
    ? locale === "te"
      ? priest.bio.te
      : priest.bio.en
    : null;

  return (
    <Card className="flex flex-col items-center text-center">
      {priest.photo ? (
        <Image
          src={priest.photo}
          alt={name}
          width={120}
          height={120}
          className="h-28 w-28 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-saffron-100">
          <User size={48} className="text-saffron-500" />
        </div>
      )}
      <h3 className="mt-4 text-xl font-bold text-temple-maroon">{name}</h3>
      <p className="mt-1 font-medium text-saffron-600">{title}</p>
      {bio && <p className="mt-3 text-sm text-gray-600">{bio}</p>}
    </Card>
  );
}
