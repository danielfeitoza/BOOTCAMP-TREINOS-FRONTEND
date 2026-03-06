import Image from "next/image";

import { Badge } from "@/components/ui/badge";

type WorkoutPlanHeaderCardProps = {
  workoutPlanName: string;
  workoutDaysCount: number;
  trainingDaysCount: number;
  coverImageUrl?: string;
};

export function WorkoutPlanHeaderCard({
  workoutPlanName,
  workoutDaysCount,
  trainingDaysCount,
  coverImageUrl,
}: WorkoutPlanHeaderCardProps) {
  return (
    <div className="relative flex h-56 w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5">
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={workoutPlanName}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />

      <Badge className="relative z-10 rounded-full bg-overlay-foreground/16 px-3 py-1.5 font-heading text-xs font-semibold text-overlay-foreground backdrop-blur-sm">
        {workoutPlanName}
      </Badge>

      <div className="relative z-10 flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold text-overlay-foreground">
          Plano de treino
        </h1>
        <p className="font-heading text-sm text-overlay-foreground/80">
          {trainingDaysCount} dias de treino em {workoutDaysCount} dias na semana
        </p>
      </div>
    </div>
  );
}
