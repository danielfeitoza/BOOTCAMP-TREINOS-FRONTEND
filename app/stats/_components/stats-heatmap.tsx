import dayjs from "dayjs";

import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";

type StatsHeatmapProps = {
  consistencyByDay: GetStats200ConsistencyByDay;
};

type DayStatus = {
  workoutDayCompleted: boolean;
  workoutDayStarted: boolean;
};

const MONTH_LABELS_PT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function startOfWeekMonday(date: dayjs.Dayjs): dayjs.Dayjs {
  const day = date.day();
  const diff = (day + 6) % 7;
  return date.subtract(diff, "day").startOf("day");
}

function endOfWeekSunday(date: dayjs.Dayjs): dayjs.Dayjs {
  const day = date.day();
  const diff = (7 - day) % 7;
  return date.add(diff, "day").startOf("day");
}

function getCellClass(status?: DayStatus): string {
  if (status?.workoutDayCompleted) {
    return "bg-primary";
  }

  if (status?.workoutDayStarted) {
    return "bg-primary-light";
  }

  return "border border-border";
}

export function StatsHeatmap({ consistencyByDay }: StatsHeatmapProps) {
  const monthStarts = [
    dayjs().subtract(2, "month").startOf("month"),
    dayjs().subtract(1, "month").startOf("month"),
    dayjs().startOf("month"),
  ];

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-heading text-lg font-semibold text-foreground">Consistência</h2>

      <div className="flex w-full gap-4 overflow-x-auto rounded-xl border border-border p-5">
        {monthStarts.map((monthStart) => {
          const monthEnd = monthStart.endOf("month");
          const gridStart = startOfWeekMonday(monthStart);
          const gridEnd = endOfWeekSunday(monthEnd);

          const days: dayjs.Dayjs[] = [];
          let cursor = gridStart;

          while (cursor.isBefore(gridEnd) || cursor.isSame(gridEnd, "day")) {
            days.push(cursor);
            cursor = cursor.add(1, "day");
          }

          const weeksCount = Math.ceil(days.length / 7);
          const columns = Array.from({ length: weeksCount }, (_, weekIndex) =>
            days.slice(weekIndex * 7, weekIndex * 7 + 7),
          );

          return (
            <div key={monthStart.format("YYYY-MM")} className="flex flex-col gap-1.5">
              <p className="font-heading text-xs text-muted-foreground">
                {MONTH_LABELS_PT[monthStart.month()]}
              </p>
              <div className="flex gap-1">
                {columns.map((weekColumn, weekIndex) => (
                  <div key={`${monthStart.format("YYYY-MM")}-${weekIndex}`} className="flex flex-col gap-1">
                    {weekColumn.map((day) => {
                      const key = day.format("YYYY-MM-DD");
                      const status = consistencyByDay[key];

                      return (
                        <div
                          key={key}
                          className={`size-5 rounded-[6px] ${getCellClass(status)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
