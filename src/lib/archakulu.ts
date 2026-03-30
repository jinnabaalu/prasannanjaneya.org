import archakuluData from "../../data/archakulu.json";
import type { Archakulu } from "@/types/archakulu";

export function getArchakulu(): Archakulu[] {
  return (archakuluData as Archakulu[]).sort((a, b) => a.order - b.order);
}
