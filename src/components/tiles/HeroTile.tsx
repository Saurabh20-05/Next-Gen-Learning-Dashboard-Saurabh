"use client";

import { motion } from "framer-motion";
import { Flame, Calendar } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { cn } from "@/lib/utils";

interface HeroTileProps {
  className?: string;
  streakCount?: number;
}

export function HeroTile({ className, streakCount = 14 }: HeroTileProps) {
  
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <BentoCard className={cn("min-h-[240px] p-8 lg:p-10", className)} glowColor="cyan" index={0}>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(0,217,255,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 50% at 90% 100%, rgba(124,58,237,0.15) 0%, transparent 60%)",
        }}
      />


      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
className="text-base text-white/50 font-mono mb-2 tracking-wider uppercase"
          >
            {greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
className="font-display text-4xl lg:text-5xl font-semibold leading-tight text-white"
          >
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-accent-cyan to-white bg-clip-text text-transparent">
              SAURABH
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
className="mt-3 text-base text-white/40"
          >
            You have 3 lessons due today.
          </motion.p>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex items-center gap-4"
        >

          <div className="flex items-center gap-2 bg-bg-overlay border border-border-subtle rounded-xl px-3 py-2">
            <Flame size={14} className="text-accent-amber" />
<span className="font-mono text-base font-medium text-white">
              {streakCount}
            </span>
<span className="text-sm text-white/40">day streak</span>
          </div>


          <div className="flex items-center gap-2 text-white/30">
            <Calendar size={13} />
<span className="font-mono text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </motion.div>
      </div>
    </BentoCard>
  );
}
