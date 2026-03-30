import type { CommitteeMember } from "@/types/committee";

import bajanaBrundhamData from "../../data/members/bajana-brundham.json";
import archakuluData from "../../data/members/archakulu.json";
import executiveBoardData from "../../data/members/executive-board.json";
import devalayaCommitteeData from "../../data/members/devalaya-committee.json";

const groupDataMap: Record<string, CommitteeMember[]> = {
  "bajana-brundham": bajanaBrundhamData as CommitteeMember[],
  "archakulu": archakuluData as CommitteeMember[],
  "executive-board": executiveBoardData as CommitteeMember[],
  "devalaya-committee": devalayaCommitteeData as CommitteeMember[],
};

const groupTranslationKeyMap: Record<string, string> = {
  "bajana-brundham": "bajanaBrundham",
  "archakulu": "archakulu",
  "executive-board": "executiveBoard",
  "devalaya-committee": "devalayaCommittee",
};

export const validGroups = Object.keys(groupDataMap);

export function getMembersByGroup(group: string): CommitteeMember[] | null {
  const data = groupDataMap[group];
  if (!data) return null;
  return [...data].sort((a, b) => a.order - b.order);
}

export function getGroupTranslationKey(group: string): string | null {
  return groupTranslationKeyMap[group] ?? null;
}
