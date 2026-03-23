"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-zinc-950 border-r border-zinc-800 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
          Style Street
        </p>
        <h2 className="text-lg font-bold text-zinc-100">Admin</h2>
      </div>

      <Separator className="bg-zinc-800" />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-zinc-100 font-semibold"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
