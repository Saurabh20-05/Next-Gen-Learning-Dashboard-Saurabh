"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "dashboard", label: "Home",     icon: LayoutDashboard },
  { id: "courses",   label: "Courses",  icon: BookOpen        },
  { id: "progress",  label: "Progress", icon: BarChart3       },
  { id: "rewards",   label: "Rewards",  icon: Trophy          },
];

export function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-bg-surface border-t border-border-subtle px-2 pb-safe">
      <div className="flex items-center justify-around py-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-1"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute inset-0 rounded-xl bg-bg-overlay"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className={cn("relative z-10 transition-colors", isActive ? "text-accent-cyan" : "text-white/30")}>
                <Icon size={18} />
              </span>
              <span className={cn("relative z-10 text-[10px] font-medium transition-colors", isActive ? "text-accent-cyan" : "text-white/30")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
