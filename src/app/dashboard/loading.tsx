import { CourseSkeleton } from "@/components/ui/CourseSkeleton";
import { HeroSkeleton } from "@/components/ui/HeroSkeleton";

export default function DashboardLoading() {
  return (
    <section className="min-h-full p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HeroSkeleton className="col-span-full lg:col-span-2" />
        <CourseSkeleton count={4} />
      </div>
    </section>
  );
}
