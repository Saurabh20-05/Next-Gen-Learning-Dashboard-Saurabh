
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface NavLinkProps {
  item: NavItem;
  collapsed: boolean;
}

export function NavLink({ item, collapsed }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 px-2 py-2.5 rounded-xl w-full",
        "transition-colors duration-150",
        isActive ? "text-white" : "text-white/40 hover:text-white/70"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-bg"
          className="absolute inset-0 rounded-xl bg-bg-overlay border border-border"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10 shrink-0">
        <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
      </span>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
className="relative z-10 text-base font-medium whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}