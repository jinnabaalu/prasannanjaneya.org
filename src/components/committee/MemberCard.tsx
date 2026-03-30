import Image from "next/image";
import Card from "@/components/ui/Card";
import { User } from "lucide-react";
import type { CommitteeMember } from "@/types/committee";

interface MemberCardProps {
  member: CommitteeMember;
  locale: string;
}

export default function MemberCard({ member, locale }: MemberCardProps) {
  const name = locale === "te" ? member.name.te : member.name.en;
  const role = locale === "te" ? member.role.te : member.role.en;

  return (
    <Card className="flex flex-col items-center text-center">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={name}
          width={100}
          height={100}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-saffron-100">
          <User size={40} className="text-saffron-500" />
        </div>
      )}
      <h3 className="mt-4 text-lg font-bold text-temple-maroon">{name}</h3>
      <p className="mt-1 text-sm text-saffron-600">{role}</p>
    </Card>
  );
}
