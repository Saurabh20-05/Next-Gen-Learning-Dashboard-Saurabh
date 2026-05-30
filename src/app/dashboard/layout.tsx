import { Sidebar } from "@/components/sidebar/Sidebar";
import { MobileNav } from "@/components/sidebar/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      <MobileNav />
    </div>
  );
}
