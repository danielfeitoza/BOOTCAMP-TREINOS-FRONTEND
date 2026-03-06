"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { completeWorkoutAction } from "../_actions";

type CompleteWorkoutButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
};

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      await completeWorkoutAction(workoutPlanId, workoutDayId, sessionId);
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleComplete}
      disabled={isPending}
      className="h-auto w-full gap-2 self-stretch rounded-full border border-border py-3 text-sm font-semibold text-foreground hover:bg-accent"
    >
      Marcar como concluído
    </Button>
  );
}
