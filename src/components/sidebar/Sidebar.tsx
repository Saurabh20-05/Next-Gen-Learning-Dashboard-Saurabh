"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  GraduationCap,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses",   label: "My Courses", icon: BookOpen,         href: "/courses"   },
  { id: "progress",  label: "Progress",   icon: BarChart3,        href: "/progress"  },
  { id: "rewards",   label: "Rewards",    icon: Trophy,           href: "/rewards"   },
];

const BOTTOM_ITEMS = [
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
const collapsed = false;
  return (
    <motion.nav
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "hidden md:flex flex-col relative z-20 shrink-0",
        "bg-bg-surface border-r border-border-subtle overflow-hidden"
      )}
    >

      <div className="flex items-center gap-3 px-4 py-5 border-b border-border-subtle min-h-[72px]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 ... flex items-center justify-center shrink-0 shadow-lg">
          <GraduationCap size={15} className="text-white" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap"
            >
<span className="text-base font-bold text-white tracking-tight leading-none">
                Next-Gen
              </span>
<span className="block text-xs text-white/40 leading-none mt-0.5 font-mono">
                Learning Platform
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      


      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>


      <div className="px-2 pb-4 flex flex-col gap-1 border-t border-border-subtle pt-3">
        {BOTTOM_ITEMS.map((item) => (
          <NavLink key={item.id} item={item} collapsed={collapsed} />
        ))}


        <div
          className={cn(
            "flex items-center gap-3 mt-2 px-2 py-2 rounded-xl",
            "cursor-pointer hover:bg-bg-overlay transition-colors duration-200"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0">
            <User size={13} />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-sm font-medium text-white leading-none">
SAURABH</p>
                <p className="text-xs text-white/40 mt-0.5 leading-none">
Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}