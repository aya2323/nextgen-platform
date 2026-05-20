"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  BarChart3,
  Shield,
  Globe,
  Sparkles,
  Rocket,
  Check,
  Star,
  Clock,
  Cpu,
  Layers,
  MessageCircle,
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.1)_0%,_transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2563eb]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#a855f7]/5 blur-[100px] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-10 text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold glass border border-[#2563eb]/20 text-[#2563eb]">
                <Sparkles size={12} /> AI-Powered Digital Engine
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Build <span className="gradient-text">Intelligent Systems</span>
              <br />
              That <span className="gradient-text">Print Revenue</span> 24/7
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              NEXTGEN transforms standard websites into AI-powered profit engines.
              We don&apos;t just build sites — we engineer revenue machines.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex gap-4 justify-center flex-wrap">
              <Link
                href="/builder"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-8 py-3.5 text-white font-semibold transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:scale-105"
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl glass px-8 py-3.5 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-8 text-gray-500 text-xs">
              <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> 4.9/5 Rating</div>
              <div className="h-3 w-px bg-gray-700" />
              <div>150+ Projects Delivered</div>
              <div className="h-3 w-px bg-gray-700" />
              <div className="flex items-center gap-1"><Globe size={12} /> 20+ Countries</div>
            </motion.div>
          </motion.div>
        </motion.div>

        <BrainScene />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05050a] to-transparent" />
      </section>

      {/* ─── SERVICES BENTO GRID ─── */}
      <section id="services" className="py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#2563eb]/40 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass border border-[#a855f7]/20 text-[#a855f7] mb-4">
                <Cpu size={12} /> Core Capabilities
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mt-4">
              Everything Your Business <span className="gradient-text">Needs</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
              AI-powered solutions engineered for maximum ROI. Each service is designed to compound your growth.
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Large card — spans 2 cols */}
            <motion.div
              variants={scaleUp}
              className="md:col-span-2 glass rounded-2xl p-8 group relative overflow-hidden bento-glow"
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2563eb]/5 blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <TrendingUp className="text-[#2563eb]" size={22} />
                  </div>
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <BarChart3 className="text-[#a855f7]" size={22} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Intelligent Web Transformation
                </h3>
                <p className="text-gray-400 mb-6 max-w-lg">
                  CRO-optimized, blazing-fast websites that convert visitors into customers.
                  Every pixel engineered for performance and profit.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["CRO Optimization", "Speed Analytics", "A/B Testing", "Revenue Tracking"].map((tag) => (
                    <span key={tag} className="text-[10px] px-3 py-1 rounded-full glass text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tall card */}
            <motion.div
              variants={scaleUp}
              className="md:row-span-2 glass rounded-2xl p-8 group relative overflow-hidden bento-glow flex flex-col justify-between"
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#a855f7]/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-6">
                  <BrainCircuit className="text-[#a855f7]" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Custom AI Integration</h3>
                <p className="text-gray-400 mb-6">
                  From chatbots to predictive analytics — we embed bespoke AI solutions directly
                  into your business workflow for 24/7 automation.
                </p>
                <div className="space-y-3">
                  {["Smart Chatbots", "Predictive Analytics", "Workflow Automation", "Custom ML Models"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-[#a855f7]" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 text-5xl font-bold gradient-text">24/7</div>
            </motion.div>

            {/* Two small cards */}
            <motion.div variants={scaleUp} className="glass rounded-2xl p-6 group bento-glow">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4">
                <Shield className="text-[#2563eb]" size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Enterprise Security</h4>
              <p className="text-sm text-gray-400">End-to-end encryption with SOC2 compliance and zero-trust architecture.</p>
              <div className="mt-4 text-3xl font-bold text-[#2563eb]">99.9%</div>
              <div className="text-xs text-gray-500">Uptime guaranteed</div>
            </motion.div>

            <motion.div variants={scaleUp} className="glass rounded-2xl p-6 group bento-glow">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4">
                <Rocket className="text-[#a855f7]" size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Lightning Delivery</h4>
              <p className="text-sm text-gray-400">From concept to launch in weeks, not months. Agile sprints with daily updates.</p>
              <div className="mt-4 text-3xl font-bold text-[#a855f7]">&lt;2wk</div>
              <div className="text-xs text-gray-500">Average delivery</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING BENTO GRID ─── */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass border border-[#2563eb]/20 text-[#2563eb] mb-4">
                <Layers size={12} /> Transparent Pricing
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mt-4">
              Invest in Your <span className="gradient-text">Growth</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Choose the package that fits your ambition. Every plan includes premium support and dedicated project management.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* AI Add-on */}
            <motion.div variants={scaleUp} className="glass rounded-2xl p-8 relative overflow-hidden bento-glow group">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#2563eb]/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-6">
                  <Bot className="text-[#2563eb]" size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">AI Add-on</h3>
                <p className="text-sm text-gray-400 mb-6">Smart AI enhancement for your existing website</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold gradient-text">$149</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    "Smart AI chatbot integration",
                    "Booking automation system",
                    "Existing website compatibility",
                    "Fast 3-day delivery",
                    "30-day free support",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-[#2563eb] shrink-0" /> {feat}
                    </div>
                  ))}
                </div>
                <Link
                  href="/builder"
                  className="block text-center w-full rounded-xl border border-[#2563eb]/30 py-3 text-sm font-semibold text-[#2563eb] hover:bg-[#2563eb]/10 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Full Future Re-brand — Featured */}
            <motion.div variants={scaleUp} className="relative rounded-2xl p-8 overflow-hidden bento-glow group">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl gradient-border-animated p-[1px]">
                <div className="w-full h-full rounded-2xl bg-[#0a0a14]" />
              </div>
              <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a14]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#a855f7]/10 blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#a855f7] flex items-center justify-center">
                    <Sparkles className="text-white" size={22} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Full Future Re-brand</h3>
                <p className="text-sm text-gray-400 mb-6">Complete futuristic website redesign with AI</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold gradient-text">$399</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    "Complete website redesign",
                    "Fully animated futuristic UI",
                    "Responsive on all devices",
                    "Core AI features included",
                    "SEO & performance optimized",
                    "3 revision rounds included",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-[#a855f7] shrink-0" /> {feat}
                    </div>
                  ))}
                </div>
                <Link
                  href="/builder"
                  className="block text-center w-full rounded-xl bg-gradient-to-r from-[#2563eb] to-[#a855f7] py-3 text-sm font-semibold text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02]"
                >
                  Start Building
                </Link>
              </div>
            </motion.div>

            {/* AI Maintenance */}
            <motion.div variants={scaleUp} className="glass rounded-2xl p-8 relative overflow-hidden bento-glow group">
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#a855f7]/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-6">
                  <Clock className="text-[#a855f7]" size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">AI Maintenance</h3>
                <p className="text-sm text-gray-400 mb-6">Ongoing AI optimization and support</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold gradient-text">$29</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    "AI model knowledge updates",
                    "Performance monitoring",
                    "Monthly optimization reports",
                    "Priority bug fixes",
                    "24/7 email support",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-[#a855f7] shrink-0" /> {feat}
                    </div>
                  ))}
                </div>
                <Link
                  href="/builder"
                  className="block text-center w-full rounded-xl border border-[#a855f7]/30 py-3 text-sm font-semibold text-[#a855f7] hover:bg-[#a855f7]/10 transition-all"
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PORTFOLIO / CASE STUDIES ─── */}
      <section id="portfolio" className="py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#2563eb]/40 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass border border-[#2563eb]/20 text-[#2563eb] mb-4">
                <TrendingUp size={12} /> Proven Results
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mt-4">
              Case <span className="gradient-text">Studies</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Real results from real clients powered by our AI-first approach.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "SkinHub AI",
                desc: "AI-powered skin analysis platform increasing user engagement by 340% and revenue by 120%.",
                tags: ["AI Vision", "SaaS", "Healthcare"],
                metric: "+340%",
                metricLabel: "Engagement",
              },
              {
                title: "TradeFlow Pro",
                desc: "Automated trading dashboard with real-time AI predictions, serving 10K+ active traders.",
                tags: ["FinTech", "Real-Time", "ML"],
                metric: "+$2.4M",
                metricLabel: "Revenue",
              },
              {
                title: "LuxeRetail AI",
                desc: "Luxury e-commerce platform with AI stylist reducing returns by 45% and boosting AOV by 60%.",
                tags: ["E-Commerce", "Fashion", "AI"],
                metric: "+60%",
                metricLabel: "AOV",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                className="glass rounded-2xl overflow-hidden group cursor-pointer bento-glow"
              >
                <div className="h-44 bg-gradient-to-br from-[#2563eb]/10 to-[#a855f7]/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-[#a855f7]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-center relative z-10">
                    <div className="text-4xl font-bold gradient-text">{item.metric}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.metricLabel}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <ExternalLink size={14} className="text-gray-500 group-hover:text-[#2563eb] transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full glass text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass border border-[#2563eb]/20 text-[#2563eb] mb-6">
                <MessageCircle size={12} /> Let&apos;s Talk
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">10x Your Revenue</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Let our AI engine analyze your business and build the perfect digital system for maximum profit.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/builder"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#a855f7] px-10 py-4 text-white text-lg font-semibold transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:scale-105"
              >
                Launch Project Builder
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/201281835834"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass px-10 py-4 text-white text-lg font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all"
              >
                <MessageCircle size={20} /> WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
