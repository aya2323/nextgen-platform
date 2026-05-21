import Link from "next/link";
import { Zap, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2563eb]/10 bg-[#05050a] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563eb] to-[#a855f7] flex items-center justify-center shrink-0">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">NEXTGEN</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The AI-First Software Engine that accelerates your revenue with
              intelligent digital systems operating 24/7.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#2563eb] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#2563eb] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#2563eb] transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-[#2563eb] transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-[#2563eb] transition-colors">Project Builder</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:aya@nextgen.ai"
                  className="flex items-center gap-2 hover:text-[#2563eb] transition-colors"
                >
                  <Mail size={14} /> aya@nextgen.ai
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201281835834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#2563eb] transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2563eb]/10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} NEXTGEN. All rights reserved. Built with AI-first engineering.
        </div>
      </div>
    </footer>
  );
}
