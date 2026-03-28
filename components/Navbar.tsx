import { auth } from "@/auth";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="currentColor"
      className={className}
    >
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
    </svg>
  );
}

export async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-zinc-100 transition-colors hover:text-white"
        >
          <StarIcon className="text-zinc-500 transition-colors group-hover:text-zinc-300" />
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">
            Style Street
          </span>
          <StarIcon className="text-zinc-500 transition-colors group-hover:text-zinc-300" />
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/products"
            className="rounded px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100"
          >
            Shop
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100"
            >
              <LayoutDashboard size={18} />
            </Link>
          )}
          <Link
            href={session?.user ? "/profile" : "/sign-in"}
            className="rounded px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100"
          >
            <User size={18} />
          </Link>
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
}
