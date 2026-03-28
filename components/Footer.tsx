import Link from "next/link";
import { Sparkle } from "@/components/Sparkle";

const links = [
  { label: "Shop", href: "/products" },
  { label: "Profile", href: "/profile" },
  { label: "Orders", href: "/profile" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main row */}
        <div className="flex flex-col items-center gap-8 py-12 sm:flex-row sm:justify-between">
          {/* Wordmark */}
          <div className="flex items-center gap-2 text-zinc-500">
            <Sparkle size={8} />
            <span className="font-display text-sm font-black tracking-[0.25em] uppercase text-zinc-100">
              Style Street
            </span>
            <Sparkle size={8} />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-zinc-800/60 py-5 sm:flex-row">
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Style Street. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700 uppercase tracking-[0.2em]">
            Streetwear Essentials
          </p>
        </div>
      </div>
    </footer>
  );
}
