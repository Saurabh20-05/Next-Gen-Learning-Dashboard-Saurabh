import { cn } from "@/lib/utils";

interface HeroSkeletonProps {
  className?: string;
}

function Pulse({ className }: { className?: string }) {
  return <div className={cn("shimmer-bg rounded-lg", className)} />;
}

export function HeroSkeleton({ className }: HeroSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-bg-elevated border border-border-subtle p-8 min-h-[200px] flex flex-col justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <Pulse className="h-3 w-24 rounded" />
        <Pulse className="h-8 w-64 rounded" />
        <Pulse className="h-3 w-48 rounded mt-1" />
      </div>
      <div className="flex gap-3">
        <Pulse className="h-8 w-32 rounded-xl" />
        <Pulse className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}
