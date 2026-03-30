import committeeData from "../../data/committee.json";
import type { CommitteeMember } from "@/types/committee";

export function getCommitteeMembers(): CommitteeMember[] {
  return (committeeData as CommitteeMember[]).sort(
    (a, b) => a.order - b.order
  );
}
