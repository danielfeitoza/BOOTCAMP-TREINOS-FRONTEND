import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { getWorkoutPlan } from "@/app/_lib/api/fetch-generated";
import { BottomNavbar } from "@/components/bottom-navbar";

import { WorkoutPlanDayCard } from "./_components/workout-plan-day-card";
import { WorkoutPlanHeaderCard } from "./_components/workout-plan-header-card";
import { WorkoutPlanRestDayCard } from "./_components/workout-plan-rest-day-card";

const WEEKDAY_ORDER: Record<string, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

type PageProps = {
  params: Promise<{ Id: string }>;
};

export default async function WorkoutPlanPage({ params }: PageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const resolvedParams = await params;

  const response = await getWorkoutPlan(resolvedParams.Id);

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status === 404) {
    notFound();
  }

  if (response.status !== 200) {
    notFound();
  }

  const workoutPlan = response.data;

  const workoutDays = [...workoutPlan.workoutDays].sort(
    (dayA, dayB) => WEEKDAY_ORDER[dayA.weekDay] - WEEKDAY_ORDER[dayB.weekDay],
  );

  const trainingDaysCount = workoutDays.filter((day) => !day.isRest).length;
  const coverImageUrl = workoutDays.find((day) => day.coverImageUrl)?.coverImageUrl;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="p-5">
        <WorkoutPlanHeaderCard
          workoutPlanName={workoutPlan.name}
          workoutDaysCount={workoutDays.length}
          trainingDaysCount={trainingDaysCount}
          coverImageUrl={coverImageUrl}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-6">
        {workoutDays.map((workoutDay) =>
          workoutDay.isRest ? (
            <WorkoutPlanRestDayCard
              key={workoutDay.id}
              workoutPlanId={workoutPlan.id}
              workoutDayId={workoutDay.id}
              name={workoutDay.name}
              weekDay={workoutDay.weekDay}
            />
          ) : (
            <WorkoutPlanDayCard
              key={workoutDay.id}
              workoutPlanId={workoutPlan.id}
              workoutDayId={workoutDay.id}
              name={workoutDay.name}
              weekDay={workoutDay.weekDay}
              estimatedDurationInSeconds={workoutDay.estimatedDurationInSeconds}
              exercisesCount={workoutDay.exercisesCount}
              coverImageUrl={workoutDay.coverImageUrl}
            />
          ),
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}
