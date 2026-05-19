"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

interface Props {
  company: string;
  industry: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  features?: string[];
}

const DEFAULT_FEATURES = [
  "AI-Powered Analytics Dashboard",
  "Smart Client Onboarding",
  "Automated Lead Scoring",
  "Real-time Performance Reports",
];

export default function MinimalistDemo({
  company,
  industry,
  primaryColor,
  secondaryColor,
  accentColor,
  features: selectedFeatures = [],
}: Props) {
  const displayFeatures = selectedFeatures.length > 0
    ? selectedFeatures.slice(0, 4)
    : DEFAULT_FEATURES;

  const stats = [
    { label: "Revenue Increase", value: "+340%", icon: TrendingUp },
    { label: "Active Users", value: "12K+", icon: Users },
    { label: "Client Rating", value: "4.9/5", icon: Star },
  ];

  const testimonials = [
    {
      quote:
        "This platform transformed how we operate. Revenue increased 3x in the first quarter.",
      name: "Sarah Mitchell",
      role: "CEO, Horizon Labs",
    },
    {
      quote:
        "The AI integration is seamless. Our team productivity doubled overnight.",
      name: "James Park",
      role: "CTO, NovaTech",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "#08080f" }}
    >
      {/* Hero */}
      <section className="relative px-8 py-20 md:px-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              background: `${primaryColor}10`,
            }}
          >
            {industry} Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            {company}.{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Simplified.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
          >
            A clean, conversion-focused platform engineered for the{" "}
            {industry.toLowerCase()} industry. Every element designed for
            clarity, speed, and results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 20px ${primaryColor}30`,
              }}
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-white border transition-all hover:bg-white/5"
              style={{ borderColor: `${primaryColor}40` }}
            >
              View Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section
        className="px-8 md:px-16 py-12 border-y"
        style={{ borderColor: `${primaryColor}15` }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <stat.icon
                size={20}
                className="mx-auto mb-2"
                style={{ color: accentColor }}
              />
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: primaryColor }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-8 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Everything you need to{" "}
            <span style={{ color: primaryColor }}>scale</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {displayFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg border"
                style={{
                  borderColor: `${primaryColor}15`,
                  background: `${primaryColor}05`,
                }}
              >
                <CheckCircle size={20} style={{ color: accentColor }} />
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="px-8 md:px-16 py-16"
        style={{ background: `${primaryColor}05` }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Trusted by{" "}
            <span style={{ color: secondaryColor }}>industry leaders</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="p-6 rounded-xl border"
                style={{
                  borderColor: `${secondaryColor}20`,
                  background: "#0a0a14",
                }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      fill={accentColor}
                      style={{ color: accentColor }}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-white text-sm font-semibold">
                    {t.name}
                  </div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-16 text-center">
        <div
          className="max-w-2xl mx-auto p-10 rounded-2xl border"
          style={{
            borderColor: `${primaryColor}20`,
            background: `linear-gradient(135deg, ${primaryColor}08, ${secondaryColor}08)`,
          }}
        >
          <Shield size={32} className="mx-auto mb-4" style={{ color: primaryColor }} />
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to transform your {industry.toLowerCase()} business?
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            Join thousands of {industry.toLowerCase()} professionals already
            using {company} to drive results.
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            Start Free Trial <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
