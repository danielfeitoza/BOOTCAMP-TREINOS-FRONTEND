import { redirect } from "next/navigation";

import { getHomeData, getMe } from "@/app/_lib/api/fetch-generated";
import { getTodayInAppTimezone } from "@/app/_lib/date";

type EnsureOnboardingOptions = {
  pathname: string;
};

export async function ensureOnboarding({ pathname }: EnsureOnboardingOptions) {
  const [homeResponse, trainDataResponse] = await Promise.all([
    getHomeData(getTodayInAppTimezone()),
    getMe(),
  ]);

  if (homeResponse.status === 401 || trainDataResponse.status === 401) {
    redirect("/auth");
  }

  const hasActiveWorkoutPlan =
    homeResponse.status === 200 && Boolean(homeResponse.data.activeWorkoutPlanId);
  const hasTrainData =
    trainDataResponse.status === 200 && Boolean(trainDataResponse.data);
  const shouldGoToOnboarding = !hasActiveWorkoutPlan || !hasTrainData;

  if (shouldGoToOnboarding && pathname !== "/onboarding" && pathname !== "/") {
    redirect("/onboarding");
  }

  if (!shouldGoToOnboarding && pathname === "/onboarding") {
    redirect("/");
  }
}
