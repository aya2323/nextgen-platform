import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2563eb]/20 bg-[#05050a]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563eb] to-[#a855f7] flex items-center justify-center shrink-0">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">NEXTGEN</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              The AI-First Software Engine that accelerates your revenue with
              intelligent digital systems.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#2563eb] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#2563eb] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-[#2563eb] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-[#2563eb] transition-colors">
                  Project Builder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:aya@nextgen.ai"
                  className="hover:text-[#2563eb] transition-colors"
                >
                  aya@nextgen.ai
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2563eb]/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} NEXTGEN. All rights reserved. Built with
          AI-first engineering.
        </div>
      </div>
    </footer>
  );
}
