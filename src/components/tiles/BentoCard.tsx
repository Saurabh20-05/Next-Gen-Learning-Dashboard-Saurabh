"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  index?: number;
}

const glowMap = {
  cyan:    "hover:shadow-[0_0_30px_rgba(0,217,255,0.15),0_0_1px_rgba(0,217,255,0.4)]  hover:border-accent-cyan/30",
  violet:  "hover:shadow-[0_0_30px_rgba(124,58,237,0.15),0_0_1px_rgba(124,58,237,0.4)] hover:border-accent-violet/30",
  emerald: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15),0_0_1px_rgba(16,185,129,0.4)] hover:border-accent-emerald/30",
  amber:   "hover:shadow-[0_0_30px_rgba(245,158,11,0.15),0_0_1px_rgba(245,158,11,0.4)]  hover:border-accent-amber/30",
  rose:    "hover:shadow-[0_0_30px_rgba(244,63,94,0.15),0_0_1px_rgba(244,63,94,0.4)]   hover:border-accent-rose/30",
};

export function BentoCard({ children, className, glowColor = "cyan", index = 0 }: BentoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.015 }}

      // @ts-expect-error framer-motion transition override for whileHover
      whileHoverTransition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl noise-overlay",
        "bg-bg-elevated border border-border-subtle",
        "transition-[border-color,box-shadow] duration-300",
        glowMap[glowColor],
        className
      )}
    >
      {children}
    </motion.article>
  );
}
