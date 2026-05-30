"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { BentoCard } from "./BentoCard";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index?: number;
  glowColor?: "cyan" | "violet" | "emerald" | "amber" | "rose";
}

type IconName = keyof typeof LucideIcons;

const colorMap = {
  cyan:    { text: "text-accent-cyan",    bar: "from-accent-cyan to-blue-400",      bg: "rgba(0,217,255,0.12)"    },
  violet:  { text: "text-accent-violet",  bar: "from-accent-violet to-purple-400",  bg: "rgba(124,58,237,0.12)"   },
  emerald: { text: "text-accent-emerald", bar: "from-accent-emerald to-teal-400",   bg: "rgba(16,185,129,0.12)"   },
  amber:   { text: "text-accent-amber",   bar: "from-accent-amber to-yellow-300",   bg: "rgba(245,158,11,0.12)"   },
  rose:    { text: "text-accent-rose",    bar: "from-accent-rose to-pink-400",      bg: "rgba(244,63,94,0.12)"    },
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const iconKey = name as IconName;

const IconComponent =
  (LucideIcons[iconKey as keyof typeof LucideIcons] ??
    LucideIcons.BookOpen) as React.ComponentType<{
      size?: number;
      className?: string;
    }>;  return <IconComponent size={18} className={className} />;
}

export function CourseCard({ course, index = 0, glowColor = "cyan" }: CourseCardProps) {
  const colors = colorMap[glowColor];
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {

    const timeout = setTimeout(() => setAnimatedProgress(course.progress), 200);
    return () => clearTimeout(timeout);
  }, [course.progress]);

  return (
<BentoCard className="p-6 min-h-[180px]" glowColor={glowColor} index={index}>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 100% 0%, ${colors.bg} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">

        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              "border border-border-subtle"
            )}
            style={{ background: colors.bg }}
          >
            <DynamicIcon name={course.icon_name} className={colors.text} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base text-white leading-snug line-clamp-2"
>
              {course.title}
            </h3>
            <p className="text-sm text-white/30 mt-1 font-mono">In progress</p>
          </div>
        </div>


        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
<span className="text-sm text-white/40">Progress</span>
            <motion.span
className={cn("font-mono text-sm font-semibold", colors.text)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.07 + 0.4 }}
            >
              {course.progress}%
            </motion.span>
          </div>


          <div className="h-1.5 rounded-full bg-bg-overlay overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", colors.bar)}
              initial={{ width: "0%" }}
              animate={{ width: `${animatedProgress}%` }}
              transition={{
                duration: 1,
                delay: index * 0.07 + 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
