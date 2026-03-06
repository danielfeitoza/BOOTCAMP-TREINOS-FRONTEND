import { Flame } from "lucide-react";

type StatsStreakBannerProps = {
  workoutStreak: number;
};

export function StatsStreakBanner({ workoutStreak }: StatsStreakBannerProps) {
  const hasStreak = workoutStreak > 0;

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10 ${
        hasStreak
          ? "bg-gradient-to-br from-primary via-destructive/60 to-foreground"
          : "bg-gradient-to-br from-muted to-muted-foreground"
      }`}
    >
      <div className="flex rounded-full border border-overlay-foreground/20 bg-overlay-foreground/12 p-3 backdrop-blur-sm">
        <Flame className="size-8 text-overlay-foreground" />
      </div>

      <div className="flex flex-col items-center gap-1 text-overlay-foreground">
        <p className="font-heading text-center text-5xl leading-[0.95] font-semibold">
          {workoutStreak} dias
        </p>
        <p className="font-heading text-base text-overlay-foreground/60">
          Sequência Atual
        </p>
      </div>
    </div>
  );
}
