import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/SidebarNav";

export async function DashboardSidebar() {
  const session = await auth();

  return (
    <aside className="w-60 bg-zinc-950 border-r border-zinc-800 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
          Style Street
        </p>
        <h2 className="text-lg font-bold text-zinc-100">
          {session?.user.name ?? "Admin"}
        </h2>
      </div>

      <Separator className="bg-zinc-800" />

      <SidebarNav />
    </aside>
  );
}
