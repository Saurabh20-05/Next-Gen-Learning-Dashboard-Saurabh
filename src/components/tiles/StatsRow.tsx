"use client";

import { motion } from "framer-motion";
import { Clock, BookCheck, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Hours this week", value: "6.4", icon: Clock,      color: "text-accent-cyan",    bg: "bg-accent-cyan/10"    },
  { label: "Lessons done",    value: "8",   icon: BookCheck,  color: "text-accent-emerald", bg: "bg-accent-emerald/10" },
  { label: "XP earned",       value: "6245",icon: Star,       color: "text-accent-amber",   bg: "bg-accent-amber/10"   },
  { label: "Course progress", value: "+35%",  icon: TrendingUp, color: "text-accent-violet",  bg: "bg-accent-violet/10"  },
];

interface StatsRowProps {
  className?: string;
}

export function StatsRow({ className }: StatsRowProps) {
  return (
    <div className={cn("col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4", className)}>
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            // @ts-expect-error
            whileHoverTransition={{ type: "spring", stiffness: 300, damping: 20 }}
className="relative rounded-2xl bg-bg-elevated border border-border-subtle p-5 min-h-[120px] overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20"
              style={{ background: `var(--${stat.color.replace("text-", "")})` }}
            />
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", stat.bg)}>
              <Icon size={15} className={stat.color} />
            </div>
            <p className="text-2xl font-semibold text-white font-mono">{stat.value}</p>
<p className="text-sm text-white/40 mt-1">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
