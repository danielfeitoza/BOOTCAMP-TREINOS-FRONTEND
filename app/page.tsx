import { authClient } from "@/app/_lib/auth-client";
import { ensureOnboarding } from "@/app/_lib/ensure-onboarding";
import { getTodayInAppTimezone } from "@/app/_lib/date";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  getHomeData,
  type GetHomeData200,
} from "./_lib/api/fetch-generated";
import Image from "next/image";

import { BottomNavbar } from "@/components/bottom-navbar";
import { WorkoutDayCard } from "@/components/workout-day-card";
import { WeeklyConsistency } from "@/components/weekly-consistency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function fetchHomeData(): Promise<GetHomeData200 | null> {
  try {
    const response = await getHomeData(getTodayInAppTimezone());
    if (response.status !== 200) return null;
    return response.data;
  } catch {
    return null;
  }
}

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await ensureOnboarding({ pathname: "/" });

  const data = await fetchHomeData();
  const firstName = session.data.user.name?.split(" ")[0] ?? "";

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="relative flex h-74 shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-4xl px-5 pb-10 pt-5">
        <div className="absolute inset-0">
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-b-4xl bg-[linear-gradient(242deg,transparent_34%,black_100%)]" />
        </div>

        <p className="relative z-10 font-['Anton',sans-serif] text-[22px] uppercase leading-[1.15] text-overlay-foreground">
          Fit.ai
        </p>

        <div className="relative z-10 flex w-full items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-overlay-foreground">
              Olá, {firstName}
            </h1>
            <p className="font-heading text-sm text-overlay-foreground/70">
              Bora treinar hoje?
            </p>
          </div>

          <Badge className="rounded-full bg-primary px-4 py-2 font-heading text-sm font-semibold text-primary-foreground">
            Bora!
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Consistência
          </h2>
          <Button variant="link" className="h-auto p-0 text-xs text-primary">
            Ver histórico
          </Button>
        </div>

        {data && (
          <WeeklyConsistency
            consistencyByDay={data.consistencyByDay}
            workoutStreak={data.workoutStreak}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Treino de Hoje
          </h2>
          <Button variant="link" className="h-auto p-0 text-xs text-primary">
            Ver treinos
          </Button>
        </div>

        {data?.todayWorkoutDay ? (
          <WorkoutDayCard
            workoutPlanId={data.todayWorkoutDay.workoutPlanId}
            workoutDayId={data.todayWorkoutDay.id}
            name={data.todayWorkoutDay.name}
            weekDay={data.todayWorkoutDay.weekDay}
            estimatedDurationInSeconds={
              data.todayWorkoutDay.estimatedDurationInSeconds
            }
            exercisesCount={data.todayWorkoutDay.exercisesCount}
            coverImageUrl={data.todayWorkoutDay.coverImageUrl}
          />
        ) : (
          <div className="flex h-50 items-center justify-center rounded-xl border border-border">
            <p className="font-heading text-sm text-muted-foreground">
              Hoje é dia de descanso 💤
            </p>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}
