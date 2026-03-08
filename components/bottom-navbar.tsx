import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { getTodayInAppTimezone } from "@/app/_lib/date";

import { BottomNavbarContent } from "@/components/bottom-navbar-content";

export async function BottomNavbar() {
  const response = await getHomeData(getTodayInAppTimezone());

  const agendaHref =
    response.status === 200 && response.data.activeWorkoutPlanId
      ? `/workout-plans/${response.data.activeWorkoutPlanId}`
      : "/";

  return <BottomNavbarContent agendaHref={agendaHref} />;
}
