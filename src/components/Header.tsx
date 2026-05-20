"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

function LogoMark() {
  return (
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#a855f7] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
      <Zap size={22} className="text-white" />
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-[#2563eb]/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-bold tracking-tight gradient-text">
            NEXTGEN
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-[#2563eb] transition-colors">
            Home
          </Link>
          <Link href="/#services" className="hover:text-[#2563eb] transition-colors">
            Services
          </Link>
          <Link href="/#pricing" className="hover:text-[#2563eb] transition-colors">
            Pricing
          </Link>
          <Link href="/#portfolio" className="hover:text-[#2563eb] transition-colors">
            Portfolio
          </Link>
          <Link
            href="/builder"
            className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-5 py-2.5 text-white font-semibold transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:scale-105"
          >
            Start Your Project
          </Link>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden glass border-t border-[#2563eb]/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#2563eb] transition-colors">
            Home
          </Link>
          <Link href="/#services" onClick={() => setOpen(false)} className="hover:text-[#2563eb] transition-colors">
            Services
          </Link>
          <Link href="/#pricing" onClick={() => setOpen(false)} className="hover:text-[#2563eb] transition-colors">
            Pricing
          </Link>
          <Link href="/#portfolio" onClick={() => setOpen(false)} className="hover:text-[#2563eb] transition-colors">
            Portfolio
          </Link>
          <Link
            href="/builder"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-5 py-2.5 text-white font-semibold text-center"
          >
            Start Your Project
          </Link>
        </nav>
      )}
    </header>
  );
}
