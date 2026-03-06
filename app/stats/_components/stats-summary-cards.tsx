import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";

type StatsSummaryCardsProps = {
  completedWorkoutsCount: number;
  conclusionRate: number;
  totalTimeInSeconds: number;
};

function formatRate(conclusionRate: number): string {
  return `${Math.round(conclusionRate * 100)}%`;
}

function formatTotalTime(totalTimeInSeconds: number): string {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  return `${hours}h${minutes}m`;
}

export function StatsSummaryCards({
  completedWorkoutsCount,
  conclusionRate,
  totalTimeInSeconds,
}: StatsSummaryCardsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full gap-3">
        <div className="flex flex-1 flex-col items-center gap-5 rounded-xl bg-primary/8 p-5">
          <div className="rounded-full bg-primary/8 p-2.5 text-primary">
            <CircleCheck className="size-4" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-heading text-4xl font-semibold leading-[1.15] text-foreground">
              {completedWorkoutsCount}
            </p>
            <p className="font-heading text-xs text-muted-foreground">Treinos Feitos</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-5 rounded-xl bg-primary/8 p-5">
          <div className="rounded-full bg-primary/8 p-2.5 text-primary">
            <CirclePercent className="size-4" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-heading text-4xl font-semibold leading-[1.15] text-foreground">
              {formatRate(conclusionRate)}
            </p>
            <p className="font-heading text-xs text-muted-foreground">Taxa de conclusão</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5 rounded-xl bg-primary/8 p-5">
        <div className="rounded-full bg-primary/8 p-2.5 text-primary">
          <Hourglass className="size-4" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-heading text-4xl font-semibold leading-[1.15] text-foreground">
            {formatTotalTime(totalTimeInSeconds)}
          </p>
          <p className="font-heading text-xs text-muted-foreground">Tempo Total</p>
        </div>
      </div>
    </div>
  );
}
