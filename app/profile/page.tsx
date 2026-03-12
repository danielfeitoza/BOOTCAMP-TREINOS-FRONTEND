import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BicepsFlexed, Ruler, User, Weight } from "lucide-react";

import { authClient } from "@/app/_lib/auth-client";
import { ensureOnboarding } from "@/app/_lib/ensure-onboarding";
import { getMe, getSmartwatch } from "@/app/_lib/api/fetch-generated";
import { BottomNavbar } from "@/components/bottom-navbar";

import { ProfileDeviceCard } from "./_components/profile-device-card";
import { ProfileLogoutButton } from "./_components/profile-logout-button";
import { ProfileMetricCard } from "./_components/profile-metric-card";

function formatWeight(weightInGrams?: number): string {
  if (!weightInGrams) {
    return "--";
  }

  return `${(weightInGrams / 1000).toFixed(1)}`;
}

function formatHeight(heightInCentimeters?: number): string {
  if (!heightInCentimeters) {
    return "--";
  }

  return `${heightInCentimeters}`;
}

function formatBodyFat(bodyFatPercentage?: number): string {
  if (bodyFatPercentage === undefined || bodyFatPercentage === null) {
    return "--";
  }

  return `${bodyFatPercentage}%`;
}

function formatAge(age?: number): string {
  if (!age) {
    return "--";
  }

  return `${age}`;
}

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  await ensureOnboarding({ pathname: "/profile" });

  const [profileResponse, smartwatchResponse] = await Promise.all([getMe(), getSmartwatch()]);

  if (profileResponse.status === 401 || smartwatchResponse.status === 401) {
    redirect("/auth");
  }

  const profileData = profileResponse.status === 200 ? profileResponse.data : null;
  const smartwatchData = smartwatchResponse.status === 200 ? smartwatchResponse.data : null;
  const userName = session.data.user.name ?? "Usuário";

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex h-14 items-center px-5">
        <p className="font-['Anton',sans-serif] text-[22px] uppercase leading-[1.15] text-foreground">
          Fit.ai
        </p>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {session.data.user.image ? (
              <Image
                src={session.data.user.image}
                alt={userName}
                width={52}
                height={52}
                className="size-[52px] rounded-full object-cover"
              />
            ) : (
              <div className="flex size-[52px] items-center justify-center rounded-full bg-primary/12 font-heading text-sm font-semibold text-primary">
                {userName.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <p className="font-heading text-lg font-semibold leading-[1.05] text-foreground">
                {userName}
              </p>
              <p className="font-heading text-sm text-foreground/70">Plano Básico</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ProfileMetricCard
            icon={Weight}
            value={formatWeight(profileData?.weightInGrams)}
            label="KG"
          />
          <ProfileMetricCard
            icon={Ruler}
            value={formatHeight(profileData?.heightInCentimeters)}
            label="CM"
          />
          <ProfileMetricCard
            icon={BicepsFlexed}
            value={formatBodyFat(profileData?.bodyFatPercentage)}
            label="GC"
          />
          <ProfileMetricCard icon={User} value={formatAge(profileData?.age)} label="ANOS" />
          <ProfileDeviceCard deviceName={smartwatchData?.deviceName ?? null} />
        </div>

        <div className="flex justify-center">
          <ProfileLogoutButton />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}
