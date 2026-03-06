import dayjs from "dayjs";

import { getHomeData } from "@/app/_lib/api/fetch-generated";

import { BottomNavbarContent } from "@/components/bottom-navbar-content";

export async function BottomNavbar() {
  const response = await getHomeData(dayjs().format("YYYY-MM-DD"));

  const agendaHref =
    response.status === 200 && response.data.activeWorkoutPlanId
      ? `/workout-plans/${response.data.activeWorkoutPlanId}`
      : "/";

  return <BottomNavbarContent agendaHref={agendaHref} />;
}
