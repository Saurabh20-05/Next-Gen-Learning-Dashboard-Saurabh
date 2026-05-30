import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-5",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}