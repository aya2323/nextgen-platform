"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  BrainCircuit,
  Globe,
  Cpu,
  Sparkles,
  BarChart3,
  Shield,
  TrendingUp,
  ArrowRight,
  Layers,
  Bot,
  Network,
  Activity,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Deterministic PRNG — identical on server + client
   ──────────────────────────────────────────────────────────── */
function srand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ────────────────────────────────────────────────────────────
   Star field generation
   ──────────────────────────────────────────────────────────── */
interface StarData {
  x: number;
  y: number;
  size: number;
  animDuration: number;
  animDelay: number;
}

function generateStars(
  count: number,
  seedOffset: number,
  sizeMin: number,
  sizeMax: number,
): StarData[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + seedOffset;
    return {
      x: srand(s * 13 + 1) * 100,
      y: srand(s * 17 + 2) * 100,
      size: srand(s * 7 + 3) * (sizeMax - sizeMin) + sizeMin,
      animDuration: srand(s * 19 + 5) * 5 + 2,
      animDelay: srand(s * 23 + 6) * 8,
    };
  });
}

/* ────────────────────────────────────────────────────────────
   Star Layer Renderer
   ──────────────────────────────────────────────────────────── */
function StarLayer({
  stars,
  driftAnimation,
  colorTint,
}: {
  stars: StarData[];
  driftAnimation: string;
  colorTint: string;
}) {
  return (
    <div className="absolute inset-0" style={{ animation: driftAnimation }}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, ${colorTint} 0%, transparent 70%)`,
            animation: `twinkle ${star.animDuration}s ${star.animDelay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Case Study Data
   ──────────────────────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    image: "/istanbul.jpeg",
    title: "Agent Istanbul",
    subtitle: "Travel & Hospitality Platform",
    link: "https://agent-istanbul.com",
  },
  {
    image: "/nokhbat.jpeg",
    title: "Nokhbat Academy",
    subtitle: "E-Learning Platform",
    link: "https://nokhbat.ayaxd.com",
  },
];

/* ────────────────────────────────────────────────────────────
   AI Capabilities (Layer 3)
   ──────────────────────────────────────────────────────────── */
const AI_CAPABILITIES = [
  {
    icon: Bot,
    title: "AI Automations & Agents",
    description:
      "Intelligent chatbots, workflow automation, and autonomous AI agents that operate 24/7.",
    gradient: "from-[#22d3ee]/10 to-[#2563eb]/10",
    borderColor: "border-[#22d3ee]/15",
    iconColor: "#22d3ee",
  },
  {
    icon: Globe,
    title: "Next-Gen Platforms",
    description:
      "Ultra-modern web platforms with real-time data, blazing performance, and immersive UI.",
    gradient: "from-[#a855f7]/10 to-[#6366f1]/10",
    borderColor: "border-[#a855f7]/15",
    iconColor: "#a855f7",
  },
  {
    icon: Layers,
    title: "Immersive 3D Experiences",
    description:
      "Cinematic web experiences with Three.js, spatial animations, and interactive 3D worlds.",
    gradient: "from-[#2563eb]/10 to-[#22d3ee]/10",
    borderColor: "border-[#2563eb]/15",
    iconColor: "#2563eb",
  },
];

/* ────────────────────────────────────────────────────────────
   Dashboard Stats (Layer 4)
   ──────────────────────────────────────────────────────────── */
const DASH_STATS = [
  { label: "Active AI Agents", value: "1,247", icon: Bot, change: "+12.4%", color: "#22d3ee" },
  { label: "Tasks Automated", value: "89.3K", icon: Activity, change: "+28.1%", color: "#a855f7" },
  { label: "Revenue Generated", value: "$2.4M", icon: TrendingUp, change: "+34.7%", color: "#22d3ee" },
  { label: "Uptime Score", value: "99.97%", icon: Shield, change: "+0.02%", color: "#10b981" },
];

const NETWORK_NODES = Array.from({ length: 12 }, (_, i) => ({
  x: srand(i * 31 + 100) * 80 + 10,
  y: srand(i * 37 + 200) * 80 + 10,
  size: srand(i * 41 + 300) * 6 + 3,
  pulseDelay: srand(i * 43 + 400) * 4,
}));

/* ────────────────────────────────────────────────────────────
   Home — Immersive 4-Layer Spatial Cinematic Experience
   ──────────────────────────────────────────────────────────── */
export default function Home() {
  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* ── Scroll proxy ── */
  const scrollProxyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollProxyRef,
    offset: ["start start", "end end"],
  });

  /* ── Layer 1: Waving Oracle (0.0 → 0.4) ── */
  const headScale = useTransform(scrollYProgress, [0, 0.4], [1, 35]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.06], [0, -80]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  /* ── Layer 2: Orbiting Case Studies (0.1 → 0.45) ── */
  const cardOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.38, 0.46], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.08, 0.14, 0.38, 0.46], [0.4, 1, 1, 0.3]);
  const card1X = useTransform(scrollYProgress, (v: number) => Math.cos(v * Math.PI * 5) * 340);
  const card1Y = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5) * 120);
  const card1Z = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5) * 100);
  const card2X = useTransform(scrollYProgress, (v: number) => Math.cos(v * Math.PI * 5 + Math.PI) * 340);
  const card2Y = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5 + Math.PI) * 120);
  const card2Z = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5 + Math.PI) * 100);

  /* ── Layer 3: AI Capabilities (0.35 → 0.65) ── */
  const capOpacity = useTransform(scrollYProgress, [0.33, 0.4, 0.58, 0.66], [0, 1, 1, 0]);
  const cap1Scale = useTransform(scrollYProgress, [0.33, 0.42], [0, 1]);
  const cap2Scale = useTransform(scrollYProgress, [0.36, 0.45], [0, 1]);
  const cap3Scale = useTransform(scrollYProgress, [0.39, 0.48], [0, 1]);
  const cap1X = useTransform(scrollYProgress, (v: number) => Math.sin((v - 0.35) * Math.PI * 3) * -180);
  const cap2Y = useTransform(scrollYProgress, (v: number) => Math.cos((v - 0.38) * Math.PI * 2.5) * 60);
  const cap3X = useTransform(scrollYProgress, (v: number) => Math.sin((v - 0.35) * Math.PI * 3) * 180);

  /* ── Layer 4: Dashboard + CTA (0.6 → 1.0) ── */
  const dashOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const dashScale = useTransform(scrollYProgress, [0.58, 0.72], [0.7, 1]);

  /* ── Nebula ── */
  const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  /* ── Stars ── */
  const farStars = useMemo(() => generateStars(80, 0, 0.5, 1.5), []);
  const midStars = useMemo(() => generateStars(50, 500, 1.2, 2.5), []);
  const nearStars = useMemo(() => generateStars(18, 1000, 2.2, 3.8), []);

  const cardTransforms = [
    { x: card1X, y: card1Y, z: card1Z },
    { x: card2X, y: card2Y, z: card2Z },
  ];
  const capScales = [cap1Scale, cap2Scale, cap3Scale];
  const capXOffsets = [cap1X, cap2Y, cap3X];

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.06; }
        }
        @keyframes drift-far {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(5px, 8px); }
          66% { transform: translate(-3px, 3px); }
        }
        @keyframes drift-mid {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-10px, 6px); }
          66% { transform: translate(7px, -5px); }
        }
        @keyframes drift-near {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(14px, -10px); }
          66% { transform: translate(-8px, 12px); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(10px); opacity: 1; }
        }
        @keyframes eye-pulse {
          0%, 100% { box-shadow: 0 0 16px rgba(34,211,238,0.8), 0 0 50px rgba(37,99,235,0.35); }
          50% { box-shadow: 0 0 26px rgba(34,211,238,1), 0 0 75px rgba(37,99,235,0.55); }
        }
        @keyframes node-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bar-grow {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
        @keyframes hand-neon-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(34,211,238,0.3)); }
          50% { filter: drop-shadow(0 0 22px rgba(34,211,238,0.6)) drop-shadow(0 0 45px rgba(37,99,235,0.25)); }
        }
      `}</style>

      {/* ── Scroll proxy ── */}
      <div ref={scrollProxyRef} className="relative w-screen" style={{ height: "500vh" }}>
        {/* ── Fixed visual layer ── */}
        <div className="fixed inset-0 h-screen w-screen overflow-x-hidden" style={{ zIndex: 10 }}>

          {/* ─── Galactic Background ─── */}
          <div className="absolute inset-0 overflow-hidden" style={{ background: "#05050a" }}>
            <motion.div
              className="absolute"
              style={{ inset: "-25%", scale: nebulaScale }}
              animate={{ rotate: [0, 360] }}
              transition={{ rotate: { duration: 180, repeat: Infinity, ease: "linear" } }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 48% 42%, rgba(34,211,238,0.07) 0%, transparent 68%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 28% 58%, rgba(168,85,247,0.06) 0%, transparent 55%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 45% at 72% 38%, rgba(37,99,235,0.05) 0%, transparent 50%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 30% at 58% 68%, rgba(168,85,247,0.035) 0%, transparent 45%)" }} />
            </motion.div>
            <StarLayer stars={farStars} driftAnimation="drift-far 50s ease-in-out infinite" colorTint="rgba(200,215,255,0.85)" />
            <StarLayer stars={midStars} driftAnimation="drift-mid 38s ease-in-out infinite" colorTint="rgba(180,200,255,0.8)" />
            <StarLayer stars={nearStars} driftAnimation="drift-near 28s ease-in-out infinite" colorTint="rgba(255,255,255,0.95)" />
          </div>

          {/* ═══════════════════════════════════════════════════
             LAYER 1: The Waving Cybernetic Oracle
             ═══════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
            <motion.div
              className="relative will-change-transform"
              style={{ scale: headScale, opacity: headOpacity }}
            >
              {/* Studio lighting gradient */}
              <div
                className="absolute pointer-events-none blur-3xl opacity-25"
                style={{
                  inset: "-55%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(37,99,235,0.35) 35%, rgba(168,85,247,0.2) 60%, transparent 80%)",
                }}
              />

              {/* Hi-Fi Robot Image */}
              <Image
                src="/robot-3d-hi.png"
                alt="NEXTGEN Cybernetic Oracle"
                width={700}
                height={700}
                priority
                className="relative w-[48vmin] h-auto object-contain"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(34,211,238,0.1)) drop-shadow(0 0 80px rgba(37,99,235,0.06))",
                }}
              />

              {/* Wake-up eye glow — left eye */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "26%",
                  left: "22%",
                  width: "12%",
                  height: "4%",
                  background: "radial-gradient(ellipse, rgba(34,211,238,0.95) 0%, rgba(37,99,235,0.5) 55%, transparent 100%)",
                  animation: "eye-pulse 3s ease-in-out infinite",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 0, 0.1, 1, 0.1, 1, 1],
                  opacity: [0, 0, 0.5, 1, 0.5, 1, 1],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 1],
                  ease: "easeOut" as const,
                }}
              />

              {/* Wake-up eye glow — right eye */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "26%",
                  left: "42%",
                  width: "12%",
                  height: "4%",
                  background: "radial-gradient(ellipse, rgba(34,211,238,0.95) 0%, rgba(37,99,235,0.5) 55%, transparent 100%)",
                  animation: "eye-pulse 3s ease-in-out infinite 0.2s",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 0, 0.1, 1, 0.1, 1, 1],
                  opacity: [0, 0, 0.5, 1, 0.5, 1, 1],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 1],
                  ease: "easeOut" as const,
                  delay: 0.15,
                }}
              />

              {/* Hand wave neon pulse overlay (right side of image = hand area) */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "15%",
                  right: "-8%",
                  width: "42%",
                  height: "70%",
                  animation: "hand-neon-pulse 2.5s ease-in-out infinite",
                }}
                animate={{ rotate: [0, 3, -3, 2, -2, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut" as const,
                }}
              />
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════
             LAYER 2: Cosmic Case Studies Orbit
             ═══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ perspective: "900px", transformStyle: "preserve-3d" }}
          >
            {CASE_STUDIES.map((study, i) => (
              <motion.a
                key={study.link}
                href={study.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute pointer-events-auto backdrop-blur-xl border border-white/15 rounded-3xl overflow-hidden shadow-2xl transition-shadow hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]"
                style={{
                  maxWidth: "28rem",
                  width: "100%",
                  x: cardTransforms[i].x,
                  y: cardTransforms[i].y,
                  z: cardTransforms[i].z,
                  opacity: cardOpacity,
                  scale: cardScale,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div className="p-5">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={500}
                      height={300}
                      className="w-full object-cover"
                      style={{ aspectRatio: "16/10" }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-base font-semibold tracking-wide">
                        {study.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{study.subtitle}</p>
                    </div>
                    <ArrowRight size={18} className="text-[#22d3ee]/60" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════
             LAYER 3: AI Capabilities Floating Bento Cards
             ═══════════════════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: capOpacity, perspective: "1000px" }}
          >
            <div className="flex gap-6 md:gap-10 flex-col md:flex-row items-center">
              {AI_CAPABILITIES.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    className={`backdrop-blur-xl border ${cap.borderColor} rounded-3xl overflow-hidden shadow-2xl`}
                    style={{
                      width: "clamp(260px, 22vw, 320px)",
                      scale: capScales[i],
                      x: i === 1 ? 0 : capXOffsets[i],
                      y: i === 1 ? capXOffsets[i] : 0,
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className={`p-6 bg-gradient-to-br ${cap.gradient}`}>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: `rgba(${cap.iconColor === "#22d3ee" ? "34,211,238" : cap.iconColor === "#a855f7" ? "168,85,247" : "37,99,235"},0.12)`,
                        }}
                      >
                        <Icon size={24} style={{ color: cap.iconColor }} />
                      </div>
                      <h3 className="text-white text-lg font-bold mb-2">{cap.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
             LAYER 4: AI Matrix Dashboard + Final CTA
             ═══════════════════════════════════════════════════ */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-y-auto"
            style={{ opacity: dashOpacity, scale: dashScale }}
          >
            <div className="w-full max-w-6xl mx-auto px-4 py-8 pointer-events-auto">

              {/* Dashboard header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#22d3ee]/20 text-[#22d3ee]/80 mb-4"
                  style={{ background: "rgba(10,10,30,0.6)", backdropFilter: "blur(12px)" }}
                >
                  <Network size={14} /> NEXTGEN AI Command Center
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Real-Time{" "}
                  <span className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">
                    Intelligence
                  </span>
                </h2>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {DASH_STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} style={{ color: stat.color }} />
                        <span className="text-gray-500 text-xs uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <span className="text-xs font-medium" style={{ color: stat.color }}>
                        {stat.change}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dashboard main grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Network visualization */}
                <div
                  className="md:col-span-2 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", minHeight: "240px" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Network size={16} className="text-[#22d3ee]" />
                    <span className="text-white text-sm font-semibold">Neural Network Activity</span>
                    <span className="ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-[10px] uppercase tracking-wider font-medium">
                        Live
                      </span>
                    </span>
                  </div>
                  <svg className="w-full h-40" viewBox="0 0 400 160">
                    {NETWORK_NODES.map((node, ni) =>
                      NETWORK_NODES.slice(ni + 1)
                        .filter((_, li) => srand(ni * 100 + li) > 0.6)
                        .map((target, li) => (
                          <line
                            key={`l-${ni}-${li}`}
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke="rgba(34,211,238,0.08)"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                            style={{
                              animation: `data-flow ${3 + srand(ni + li) * 4}s linear infinite`,
                            }}
                          />
                        )),
                    )}
                    {NETWORK_NODES.map((node, i) => (
                      <circle
                        key={`n-${i}`}
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={node.size}
                        fill="#22d3ee"
                        opacity="0.5"
                        style={{
                          animation: `node-pulse ${2 + node.pulseDelay}s ease-in-out infinite ${node.pulseDelay}s`,
                        }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Performance metrics */}
                <div
                  className="backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={16} className="text-[#a855f7]" />
                    <span className="text-white text-sm font-semibold">Performance</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {Array.from({ length: 8 }, (_, i) => {
                      const h = srand(i * 47 + 500) * 70 + 30;
                      const clr = i % 2 === 0 ? "#22d3ee" : "#a855f7";
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, ${clr}40, ${clr})`,
                            animation: `bar-grow 1.2s ease-out ${i * 0.1}s both`,
                            transformOrigin: "bottom",
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-gray-600">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                    <span>Now</span>
                  </div>
                </div>
              </div>

              {/* Bottom row: AI Insights + Ultimate CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI Insights */}
                <div
                  className="backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit size={16} className="text-[#22d3ee]" />
                    <span className="text-white text-sm font-semibold">AI Insights Feed</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: "Revenue projection increased by 34.7%", time: "2m ago", icon: TrendingUp, color: "#22d3ee" },
                      { text: "New AI agent deployed: Customer Support v3", time: "8m ago", icon: Bot, color: "#a855f7" },
                      { text: "System optimization complete — 12ms faster", time: "15m ago", icon: Cpu, color: "#10b981" },
                      { text: "3 new client pipelines activated", time: "22m ago", icon: Sparkles, color: "#22d3ee" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.text}
                          className="flex items-start gap-3 p-3 rounded-xl border border-white/5"
                          style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${item.color}15` }}
                          >
                            <Icon size={14} style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-xs leading-relaxed">{item.text}</p>
                            <span className="text-gray-600 text-[10px]">{item.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ─── ULTIMATE CTA ─── */}
                <div
                  className="backdrop-blur-xl border border-[#22d3ee]/15 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(34,211,238,0.06) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <Sparkles size={32} className="text-[#22d3ee] mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      Ready to Automate
                      <br />
                      Your Future?
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                      Join 500+ companies leveraging NEXTGEN AI to transform their digital
                      presence.
                    </p>
                    <Link
                      href="/builder"
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] via-[#2563eb] to-[#a855f7] px-8 py-4 text-white text-base font-semibold transition-all hover:shadow-[0_0_50px_rgba(34,211,238,0.35)] hover:scale-105"
                    >
                      Start Your Project
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <p className="text-gray-600 text-xs mt-4">No commitment required</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Hero text overlay ─── */}
          <motion.div
            className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
            style={{ top: "7vh", opacity: textOpacity, y: textY }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#22d3ee]/20 text-[#22d3ee]/80 mb-5"
              style={{
                background: "rgba(10,10,30,0.55)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              ✦ Spatial Cinematic Experience
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-none tracking-tight">
              <span className="gradient-text">NEXTGEN</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-500/80 text-center max-w-sm tracking-wide">
              Scroll to enter the AI dimension
            </p>
          </motion.div>

          {/* ─── Scroll hint ─── */}
          <motion.div
            className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
            style={{ bottom: "4vh", opacity: scrollHintOpacity }}
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-3">
              Scroll
            </span>
            <div
              className="w-5 h-9 rounded-full border border-gray-700/60 flex items-start justify-center pt-1.5"
              style={{ animation: "scroll-bounce 2.2s ease-in-out infinite" }}
            >
              <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-[#22d3ee] to-[#a855f7]" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
