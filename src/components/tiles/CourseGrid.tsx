import { CourseCard } from "./CourseCard";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
}

const GLOW_CYCLE = ["cyan", "violet", "emerald", "amber", "rose"] as const;

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="text-white/30 text-sm">No courses yet — add some in your Supabase table.</p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, i) => (
        <CourseCard
          key={course.id}
          course={course}
          index={i + 2} 
          glowColor={GLOW_CYCLE[i % GLOW_CYCLE.length]}
        />
      ))}
    </>
  );
}
