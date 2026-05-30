"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { activityData, getCurrentStreak } from "@/lib/activity";
import { cn } from "@/lib/utils";

interface ActivityTileProps {
  className?: string;
}

const INTENSITY_COLORS = [
  "bg-white/[0.04]",  
  "bg-accent-cyan/25",
  "bg-accent-cyan/45",
  "bg-accent-cyan/65",
  "bg-accent-cyan/90",     
];

const INTENSITY_GLOW = [
  "",
  "",
  "shadow-[0_0_4px_rgba(0,217,255,0.3)]",
  "shadow-[0_0_6px_rgba(0,217,255,0.45)]",
  "shadow-[0_0_8px_rgba(0,217,255,0.6)]",
];

export function ActivityTile({ className }: ActivityTileProps) {
  const streak = getCurrentStreak(activityData);


  const weeks: typeof activityData[] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalActiveDays = activityData.filter((d) => d.count > 0).length;

  return (
    <BentoCard className={cn("p-6 lg:p-8 min-h-[280px]", className)} glowColor="cyan" index={6}>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,217,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-accent-cyan" />
<h2 className="text-base font-semibold text-white">Learning Activity</h2>
          </div>
          <div className="flex items-center gap-4">
<span className="text-sm text-white/30 font-mono">{totalActiveDays} active days</span>
            <div className="flex items-center gap-1.5 bg-bg-overlay border border-border-subtle rounded-lg px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow" />
<span className="font-mono text-sm text-accent-cyan">{streak}d streak</span>
            </div>
          </div>
        </div>


        <div className="flex gap-1 mb-1 ml-[2px]">
          {["Mon", "", "Wed", "", "Fri", "", "Sun"].map((label, i) => (
            <div key={i} className="flex-1 text-[9px] text-white/20 font-mono text-center">
              {label}
            </div>
          ))}
        </div>


        <div className="flex gap-1 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 shrink-0">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.count} sessions`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi * 7 + di) * 0.003,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "w-[10px] h-[10px] rounded-[2px] cursor-pointer",
                    "transition-transform hover:scale-125",
                    INTENSITY_COLORS[day.count],
                    INTENSITY_GLOW[day.count]
                  )}
                />
              ))}
            </div>
          ))}
        </div>


        <div className="flex items-center gap-1.5 mt-3 justify-end">
<span className="text-xs text-white/20">Less</span>
          {INTENSITY_COLORS.map((color, i) => (
            <div key={i} className={cn("w-2.5 h-2.5 rounded-[2px]", color)} />
          ))}
<span className="text-xs text-white/20">More</span>
        </div>
      </div>
    </BentoCard>
  );
}
