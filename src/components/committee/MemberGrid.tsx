import MemberCard from "./MemberCard";
import type { CommitteeMember } from "@/types/committee";

interface MemberGridProps {
  members: CommitteeMember[];
  locale: string;
}

export default function MemberGrid({ members, locale }: MemberGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} locale={locale} />
      ))}
    </div>
  );
}
