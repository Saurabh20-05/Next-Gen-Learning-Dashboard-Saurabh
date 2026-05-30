import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { BentoGrid } from "@/components/tiles/BentoGrid";
import { HeroTile } from "@/components/tiles/HeroTile";
import { ActivityTile } from "@/components/tiles/ActivityTile";
import { CourseGrid } from "@/components/tiles/CourseGrid";
import { CourseSkeleton } from "@/components/ui/CourseSkeleton";
import { StatsRow } from "@/components/tiles/StatsRow";
import type { Course } from "@/types";

export const dynamic = "force-dynamic";

async function CoursesSection() {
  const supabase = createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true })
    .returns<Course[]>();

  if (error) {
    return (
      <div className="col-span-full rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
        <p className="font-mono text-sm text-rose-400">
          ⚠ Could not load courses — check your Supabase env vars.
        </p>
        <p className="mt-1 font-mono text-xs text-rose-400/60">{error.message}</p>
      </div>
    );
  }

  return <CourseGrid courses={courses ?? []} />;
}

export default function DashboardPage() {
  return (
<section className="min-h-full p-6 lg:p-8 xl:p-10 w-full">
      <BentoGrid>

        <HeroTile className="col-span-full lg:col-span-2" streakCount={14} />


        <StatsRow className="col-span-full" />

        <Suspense fallback={<CourseSkeleton count={4} />}>
          <CoursesSection />
        </Suspense>


        <ActivityTile className="col-span-full lg:col-span-2" />
      </BentoGrid>
    </section>
  );
}
