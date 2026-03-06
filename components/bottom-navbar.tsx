import dayjs from "dayjs";

import { getHomeData } from "@/app/_lib/api/fetch-generated";

import { BottomNavbarContent } from "@/components/bottom-navbar-content";

export async function BottomNavbar() {
  const response = await getHomeData(dayjs().format("YYYY-MM-DD"));

  const agendaHref =
    response.status === 200 && response.data.todayWorkoutDay
      ? `/workout-plans/${response.data.todayWorkoutDay.workoutPlanId}/days/${response.data.todayWorkoutDay.id}?workoutPlanId=${response.data.todayWorkoutDay.workoutPlanId}&workoutDayId=${response.data.todayWorkoutDay.id}`
      : "/";

  return <BottomNavbarContent agendaHref={agendaHref} />;
}
