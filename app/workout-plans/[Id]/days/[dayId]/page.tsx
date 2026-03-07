import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Calendar, CircleHelp, Clock3, Dumbbell } from "lucide-react";

import { authClient } from "@/app/_lib/auth-client";
import {
  getWorkoutDay,
  type GetWorkoutDay200,
} from "@/app/_lib/api/fetch-generated";
import { BackButton } from "@/components/back-button";
import { BottomNavbar } from "@/components/bottom-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buildOpenChatHref,
  getExerciseHelpMessage,
} from "@/lib/chatbot-url";

import { CompleteWorkoutButton } from "./_components/complete-workout-button";
import { StartWorkoutButton } from "./_components/start-workout-button";

type PageProps = {
  params: Promise<{ Id: string; dayId: string }>;
  searchParams: Promise<{
    workoutPlanId?: string | string[];
    workoutDayId?: string | string[];
  }>;
};

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

function getSingleValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}min` : ""}`;
  }

  return `${minutes}min`;
}

function getWorkoutState(workoutDay: GetWorkoutDay200) {
  const hasCompletedSession = workoutDay.sessions.some(
    (session) => !!session.completedAt,
  );

  const inProgressSession = workoutDay.sessions.find(
    (session) => !!session.startedAt && !session.completedAt,
  );

  return {
    hasCompletedSession,
    inProgressSession,
  };
}

export default async function WorkoutDayPage({
  params,
  searchParams,
}: PageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const queryWorkoutPlanId = getSingleValue(resolvedSearchParams.workoutPlanId);
  const queryWorkoutDayId = getSingleValue(resolvedSearchParams.workoutDayId);

  const workoutPlanId = queryWorkoutPlanId ?? resolvedParams.Id;
  const workoutDayId = queryWorkoutDayId ?? resolvedParams.dayId;

  if (!workoutPlanId || !workoutDayId) {
    notFound();
  }

  const response = await getWorkoutDay(workoutPlanId, workoutDayId);

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status === 404) {
    notFound();
  }

  if (response.status !== 200) {
    notFound();
  }

  const workoutDay = response.data;
  const { hasCompletedSession, inProgressSession } = getWorkoutState(workoutDay);

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex items-center justify-between self-stretch px-5 pt-5">
        <BackButton className="bg-transparent text-foreground hover:bg-accent hover:text-foreground" />
        <h1 className="font-heading text-lg font-semibold text-foreground">
          Treino do dia
        </h1>
        <div className="size-9" />
      </div>

      <div className="px-5 pt-4">
        <div className="relative flex h-50 w-full flex-col items-start justify-between self-stretch overflow-hidden rounded-xl p-5">
          {workoutDay.coverImageUrl ? (
            <Image
              src={workoutDay.coverImageUrl}
              alt={workoutDay.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-primary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />

          <Badge className="relative z-10 w-fit rounded-full bg-overlay-foreground/16 px-3 py-1.5 text-xs font-semibold text-overlay-foreground">
            <Calendar className="mr-1 size-3.5" />
            {WEEKDAY_LABELS[workoutDay.weekDay] ?? workoutDay.weekDay}
          </Badge>

          <div className="relative z-10 flex w-full items-center justify-between self-stretch">
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-3xl font-semibold text-overlay-foreground">
                {workoutDay.name}
              </h1>
              <div className="flex items-center gap-3 text-overlay-foreground/85">
                <span className="flex items-center gap-1 text-xs">
                  <Clock3 className="size-3.5" />
                  {formatDuration(workoutDay.estimatedDurationInSeconds)}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Dumbbell className="size-3.5" />
                  {workoutDay.exercises.length} exercícios
                </span>
              </div>
            </div>

            {!inProgressSession && !hasCompletedSession && (
              <StartWorkoutButton
                workoutPlanId={workoutPlanId}
                workoutDayId={workoutDayId}
                className="h-10 rounded-full px-5 text-sm font-semibold"
              />
            )}

            {hasCompletedSession && (
              <Button
                type="button"
                variant="ghost"
                disabled
                className="rounded-full px-4 py-2 font-heading text-sm font-semibold text-background/70 hover:bg-transparent hover:text-background/70"
              >
                Concluído!
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-4">
        {workoutDay.exercises
          .sort((exerciseA, exerciseB) => exerciseA.order - exerciseB.order)
          .map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate font-heading text-sm font-semibold text-foreground">
                  {exercise.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {exercise.sets} séries x {exercise.reps} reps
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-full text-muted-foreground"
                aria-label={`Detalhes de ${exercise.name}`}
                asChild
              >
                <Link
                  href={buildOpenChatHref(
                    `/workout-plans/${workoutPlanId}/days/${workoutDayId}`,
                    getExerciseHelpMessage(exercise.name),
                  )}
                >
                  <CircleHelp className="size-4.5" />
                </Link>
              </Button>
            </div>
          ))}
      </div>

      {inProgressSession && (
        <div className="px-5 pb-6">
          <CompleteWorkoutButton
            workoutPlanId={workoutPlanId}
            workoutDayId={workoutDayId}
            sessionId={inProgressSession.id}
          />
        </div>
      )}

      <BottomNavbar />
    </div>
  );
}
