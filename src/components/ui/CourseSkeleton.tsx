import { cn } from "@/lib/utils";

interface CourseSkeletonProps {
  count?: number;
  className?: string;
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg shimmer-bg",
        className
      )}
    />
  );
}

function SingleCourseSkeleton() {
  return (
    <div className="rounded-2xl bg-bg-elevated border border-border-subtle p-5 flex flex-col gap-4 min-h-[160px]">
      <div className="flex items-start gap-3">
        <SkeletonPulse className="w-9 h-9 rounded-xl shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <SkeletonPulse className="h-3.5 w-3/4 rounded" />
          <SkeletonPulse className="h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex justify-between">
          <SkeletonPulse className="h-2.5 w-12 rounded" />
          <SkeletonPulse className="h-2.5 w-8 rounded" />
        </div>
        <SkeletonPulse className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CourseSkeleton({ count = 4, className }: CourseSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleCourseSkeleton key={i} />
      ))}
    </>
  );
}
