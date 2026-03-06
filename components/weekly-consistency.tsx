import dayjs from "dayjs";
import { Flame } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";

const WEEKDAY_NAMES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const WEEK_DAYS = [
  { weekday: "MONDAY", label: "S" },
  { weekday: "TUESDAY", label: "T" },
  { weekday: "WEDNESDAY", label: "Q" },
  { weekday: "THURSDAY", label: "Q" },
  { weekday: "FRIDAY", label: "S" },
  { weekday: "SATURDAY", label: "S" },
  { weekday: "SUNDAY", label: "D" },
] as const;

function normalizeConsistency(
  raw: GetHomeData200ConsistencyByDay,
): Record<string, { workoutDayCompleted: boolean; workoutDayStarted: boolean }> {
  const keys = Object.keys(raw);
  if (keys.length === 0) return {};

  const isWeekdayKey = keys.some((k) =>
    (WEEKDAY_NAMES as readonly string[]).includes(k),
  );

  if (isWeekdayKey) return raw;

  const mapped: Record<
    string,
    { workoutDayCompleted: boolean; workoutDayStarted: boolean }
  > = {};
  for (const [dateStr, value] of Object.entries(raw)) {
    const weekday = dayjs(dateStr).format("dddd").toUpperCase();
    mapped[weekday] = value;
  }
  return mapped;
}

function getTodayWeekDay(): string {
  return dayjs().format("dddd").toUpperCase();
}

interface WeeklyConsistencyProps {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  workoutStreak: number;
}

export function WeeklyConsistency({
  consistencyByDay,
  workoutStreak,
}: WeeklyConsistencyProps) {
  const todayKey = getTodayWeekDay();
  const normalized = normalizeConsistency(consistencyByDay);

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center justify-between rounded-xl border border-border p-5">
        {WEEK_DAYS.map((day) => {
          const status = normalized[day.weekday];
          const isToday = day.weekday === todayKey;
          const isCompleted = status?.workoutDayCompleted === true;
          const isStarted = status?.workoutDayStarted === true;

          return (
            <div
              key={day.weekday}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "size-5 rounded-[6px]",
                  isCompleted && "bg-primary",
                  !isCompleted && isStarted && "bg-primary-light",
                  !isCompleted &&
                    !isStarted &&
                    isToday &&
                    "border-[1.6px] border-primary",
                  !isCompleted &&
                    !isStarted &&
                    !isToday &&
                    "border border-border",
                )}
              />
              <span className="font-heading text-xs leading-[1.4] text-muted-foreground">
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 self-stretch rounded-xl bg-streak px-5">
        <Flame className="size-5 text-streak-foreground" />
        <span className="font-heading text-base font-semibold text-foreground">
          {workoutStreak}
        </span>
      </div>
    </div>
  );
}
