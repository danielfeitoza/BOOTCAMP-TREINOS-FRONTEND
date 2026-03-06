import { LucideIcon } from "lucide-react";

type ProfileMetricCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export function ProfileMetricCard({ icon: Icon, value, label }: ProfileMetricCardProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-primary/8 p-5">
      <div className="rounded-full bg-primary/8 p-2.5 text-primary">
        <Icon className="size-4" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="font-heading text-4xl leading-[1.15] font-semibold text-foreground">
          {value}
        </p>
        <p className="font-heading text-xs uppercase text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
