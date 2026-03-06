import Link from "next/link";
import { BedDouble, Calendar, Zap } from "lucide-react";

type WorkoutPlanRestDayCardProps = {
  workoutPlanId: string;
  workoutDayId: string;
  name: string;
  weekDay: string;
};

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

export function WorkoutPlanRestDayCard({
  workoutPlanId,
  workoutDayId,
  name,
  weekDay,
}: WorkoutPlanRestDayCardProps) {
  return (
    <Link
      href={`/workout-plans/${workoutPlanId}/days/${workoutDayId}`}
      aria-label={`${name} - dia de descanso`}
      className="flex h-27.5 w-full flex-col justify-between rounded-xl border border-border bg-card p-5"
    >
      <span className="flex w-fit items-center gap-1 rounded-full bg-muted px-2.5 py-1.5">
        <Calendar className="size-3.5 text-muted-foreground" />
        <span className="font-heading text-xs font-semibold uppercase text-muted-foreground">
          {WEEKDAY_LABELS[weekDay] ?? weekDay}
        </span>
      </span>

      <div className="flex items-center justify-between gap-3">
        <div id="mudeAqui" className="flex items-center gap-3">
          <div className="text-muted-foreground ">
            <Zap id="outroIcone" className="size-5 text-blue-600" />
          </div>
          <h3 className="font-heading text-2xl font-semibold leading-[1.05] text-foreground">
            Dia de descanso
          </h3>
        </div>
      </div>
    </Link>
  );
}
