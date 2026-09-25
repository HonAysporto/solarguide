
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    name: "Solar Conditions",
    href: "/",
  },
  {
    name: "System Sizing",
    href: "/Calculate",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            rounded-2xl
            border border-white/[0.12]
            bg-white/[0.06]
            shadow-[0_8px_40px_rgba(0,0,0,0.25)]
            backdrop-blur-2xl
            backdrop-saturate-150
          "
        >
          {/* Subtle glass highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

          <div className="flex min-h-[72px] items-center justify-between px-4 sm:px-6">

            {/* Brand */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex min-w-0 items-center gap-3"
            >
              {/* Logo */}
              <div
                className="
                  relative
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-yellow-300/30
                  bg-yellow-400
                  shadow-[0_0_25px_rgba(250,204,21,0.18)]
                "
              >
                {/* Sun */}
                <div className="h-3.5 w-3.5 rounded-full bg-slate-950" />

                {/* Glass reflection */}
                <div className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-white/30 blur-md" />
              </div>

              {/* Brand text */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
                    Solar
                    <span className="text-yellow-400">Guide</span>
                  </span>

                  <span className="hidden rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-yellow-300 sm:inline-block">
                    Beta
                  </span>
                </div>

                <p className="mt-0.5 hidden text-[11px] text-slate-400 sm:block">
                  Build the right solar system for your needs
                </p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav
              className="
                hidden
                items-center
                gap-1
                rounded-xl
                border border-white/[0.08]
                bg-black/10
                p-1
                md:flex
              "
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative
                      rounded-lg
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-yellow-400 text-slate-950 shadow-[0_4px_20px_rgba(250,204,21,0.15)]"
                          : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border border-white/10
                bg-white/[0.05]
                text-slate-300
                transition
                hover:border-yellow-400/30
                hover:bg-yellow-400/10
                hover:text-yellow-300
                md:hidden
              "
            >
              <span className="text-lg">
                {mobileMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-white/[0.08] px-4 pb-4 pt-3 md:hidden">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-sm
                        font-medium
                        transition
                        ${
                          isActive
                            ? "border-yellow-400/20 bg-yellow-400 text-slate-950"
                            : "border-white/[0.06] bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white"
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

