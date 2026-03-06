import Image from "next/image";
import { Calendar, Timer, Dumbbell } from "lucide-react";

import { cn } from "@/lib/utils";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? `${minutes}min` : ""}`;
  }
  return `${minutes}min`;
}

interface WorkoutDayCardProps {
  name: string;
  weekDay: string;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
  className?: string;
}

export function WorkoutDayCard({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  className,
}: WorkoutDayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-50 flex-col items-start justify-between overflow-hidden rounded-xl p-5",
        className,
      )}
    >
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt={name}
          fill
          className="pointer-events-none object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,transparent_100%)]" />

      <div className="relative z-10 flex items-center justify-center">
        <span className="flex items-center gap-1 rounded-full bg-overlay-foreground/16 px-2.5 py-1.5 backdrop-blur-sm">
          <Calendar className="size-3.5 text-overlay-foreground" />
          <span className="font-heading text-xs font-semibold uppercase text-overlay-foreground">
            {WEEKDAY_LABELS[weekDay] ?? weekDay}
          </span>
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-heading text-2xl font-semibold leading-[1.05] text-overlay-foreground">
          {name}
        </h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <Timer className="size-3.5 text-overlay-foreground/70" />
            <span className="font-heading text-xs text-overlay-foreground/70">
              {formatDuration(estimatedDurationInSeconds)}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="size-3.5 text-overlay-foreground/70" />
            <span className="font-heading text-xs text-overlay-foreground/70">
              {exercisesCount} exercícios
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
