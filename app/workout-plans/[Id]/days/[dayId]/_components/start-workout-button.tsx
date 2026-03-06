"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { startWorkoutAction } from "../_actions";

type StartWorkoutButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
  className?: string;
};

export function StartWorkoutButton({
  workoutPlanId,
  workoutDayId,
  className,
}: StartWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleStart = () => {
    startTransition(async () => {
      await startWorkoutAction(workoutPlanId, workoutDayId);
    });
  };

  return (
    <Button
      type="button"
      onClick={handleStart}
      disabled={isPending}
      className={className}
    >
      Iniciar treino
    </Button>
  );
}
