import dayjs from "dayjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { getStats } from "@/app/_lib/api/fetch-generated";
import { BottomNavbar } from "@/components/bottom-navbar";

import { StatsHeatmap } from "./_components/stats-heatmap";
import { StatsStreakBanner } from "./_components/stats-streak-banner";
import { StatsSummaryCards } from "./_components/stats-summary-cards";

export default async function StatsPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const from = dayjs().subtract(2, "month").startOf("month").format("YYYY-MM-DD");
  const to = dayjs().endOf("month").format("YYYY-MM-DD");

  const response = await getStats({ from, to });

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status !== 200) {
    return (
      <div className="flex min-h-svh flex-col bg-background pb-24">
        <div className="flex h-14 items-center px-5">
          <p className="font-['Anton',sans-serif] text-[22px] uppercase leading-[1.15] text-foreground">
            Fit.ai
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center px-5">
          <p className="font-heading text-sm text-muted-foreground">
            Não foi possível carregar suas estatísticas.
          </p>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  const stats = response.data;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex h-14 items-center px-5">
        <p className="font-['Anton',sans-serif] text-[22px] uppercase leading-[1.15] text-foreground">
          Fit.ai
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 pb-5">
        <StatsStreakBanner workoutStreak={stats.workoutStreak} />
        <StatsHeatmap consistencyByDay={stats.consistencyByDay} />
        <StatsSummaryCards
          completedWorkoutsCount={stats.completedWorkoutsCount}
          conclusionRate={stats.conclusionRate}
          totalTimeInSeconds={stats.totalTimeInSeconds}
        />
      </div>

      <BottomNavbar />
    </div>
  );
}
