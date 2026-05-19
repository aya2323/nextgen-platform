"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Gauge,
  Bot,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

const BrainScene = dynamic(() => import("@/components/BrainScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <img
              src="/nextgen-logo.png"
              alt="NEXTGEN"
              className="h-16 md:h-20 mx-auto object-contain mb-6"
            />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            <span className="gradient-text">NEXTGEN</span>: The AI-First
            Software Engine That{" "}
            <span className="gradient-text">Accelerates Your Revenue</span>.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We don&apos;t just build sites; we construct intelligent systems
            that operate 24/7 to generate profit.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex gap-4 justify-center flex-wrap">
            <Link
              href="/builder"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-8 py-3.5 text-white font-semibold transition-all hover:shadow-[0_0_35px_rgba(37,99,235,0.4)] hover:scale-105"
            >
              Start Your Project
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2563eb]/30 px-8 py-3.5 text-white font-semibold hover:border-[#a855f7]/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        <BrainScene />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05050a] to-transparent" />
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold"
            >
              Our <span className="gradient-text">Services</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-400 max-w-2xl mx-auto"
            >
              Transform your digital presence with AI-powered solutions
              engineered for maximum ROI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="glow-border rounded-2xl p-8 bg-[#0a0a14] hover:bg-[#0d0d1a] transition-colors group"
            >
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#2563eb]/10 flex items-center justify-center">
                  <TrendingUp className="text-[#2563eb]" size={24} />
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
                  <Gauge className="text-[#a855f7]" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Intelligent Web Transformation
              </h3>
              <p className="text-gray-400 mb-6">
                CRO-optimized, blazing-fast websites that convert visitors into
                customers. Every pixel engineered for performance and profit.
              </p>
              <div className="flex gap-3">
                <span className="text-xs px-3 py-1 rounded-full border border-[#2563eb]/30 text-[#2563eb]">
                  CRO
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[#a855f7]/30 text-[#a855f7]">
                  Speed
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[#2563eb]/30 text-[#2563eb]">
                  Analytics
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glow-border rounded-2xl p-8 bg-[#0a0a14] hover:bg-[#0d0d1a] transition-colors group"
            >
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#2563eb]/10 flex items-center justify-center">
                  <Bot className="text-[#2563eb]" size={24} />
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
                  <BrainCircuit className="text-[#a855f7]" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Custom AI Integration
              </h3>
              <p className="text-gray-400 mb-6">
                From chatbots to predictive analytics — we embed bespoke AI
                solutions directly into your business workflow for 24/7
                automation.
              </p>
              <div className="flex gap-3">
                <span className="text-xs px-3 py-1 rounded-full border border-[#2563eb]/30 text-[#2563eb]">
                  Automation
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[#a855f7]/30 text-[#a855f7]">
                  Logic
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[#2563eb]/30 text-[#2563eb]">
                  AI Models
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 px-6 bg-[#08081a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold"
            >
              Case <span className="gradient-text">Studies</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-400 max-w-2xl mx-auto"
            >
              Real results from real clients powered by our AI-first approach.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "SkinHub AI",
                desc: "AI-powered skin analysis platform increasing user engagement by 340% and revenue by 120%.",
                tags: ["AI Vision", "SaaS", "Healthcare"],
                metric: "+340% Engagement",
              },
              {
                title: "TradeFlow Pro",
                desc: "Automated trading dashboard with real-time AI predictions, serving 10K+ active traders.",
                tags: ["FinTech", "Real-Time", "ML"],
                metric: "+$2.4M Revenue",
              },
              {
                title: "LuxeRetail AI",
                desc: "Luxury e-commerce platform with AI stylist reducing returns by 45% and boosting AOV by 60%.",
                tags: ["E-Commerce", "Fashion", "AI"],
                metric: "+60% AOV",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glow-border rounded-2xl overflow-hidden bg-[#0a0a14] group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-[#2563eb]/20 to-[#a855f7]/20 flex items-center justify-center">
                  <Zap
                    size={48}
                    className="text-[#2563eb] group-hover:text-[#a855f7] transition-colors"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={16}
                      className="text-gray-500 group-hover:text-[#2563eb] transition-colors"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-[#2563eb]/10 text-[#2563eb]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-semibold gradient-text">
                    {item.metric}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to <span className="gradient-text">10x Your Revenue</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-10 text-lg">
              Let our AI engine analyze your business and build the perfect
              digital system for maximum profit.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/builder"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-10 py-4 text-white text-lg font-semibold transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:scale-105"
              >
                Launch Project Builder
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
