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
   Front-Facing Symmetric Cybernetic Oracle Head (SVG)
   ──────────────────────────────────────────────────────────── */
function OracleHead() {
  return (
    <svg
      viewBox="0 0 500 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[42vmin] h-auto"
      style={{ filter: "drop-shadow(0 0 60px rgba(34,211,238,0.1))" }}
    >
      <defs>
        <filter id="glow-amb" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
        <filter id="glow-eye" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-line" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="crFill" x1="250" y1="20" x2="250" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#141430" />
          <stop offset="40%" stopColor="#0c0c24" />
          <stop offset="100%" stopColor="#070718" />
        </linearGradient>
        <linearGradient id="faceFill" x1="250" y1="60" x2="250" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10102c" />
          <stop offset="100%" stopColor="#09091e" />
        </linearGradient>
        <linearGradient id="eyeFill" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="250" cy="300" rx="220" ry="270" fill="rgba(34,211,238,0.025)" filter="url(#glow-amb)" />

      {/* Outer cranium */}
      <path
        d="M250,18 L130,110 L100,230 L105,340 L130,430 L175,500 L210,540 L250,555 L290,540 L325,500 L370,430 L395,340 L400,230 L370,110 Z"
        fill="url(#crFill)"
        stroke="rgba(34,211,238,0.25)"
        strokeWidth="1.3"
      />
      <path
        d="M250,24 L135,112 L106,230 L110,338 L134,426 L178,496 L213,535 L250,549 L287,535 L322,496 L366,426 L390,338 L394,230 L365,112 Z"
        fill="none"
        stroke="rgba(168,85,247,0.08)"
        strokeWidth="0.5"
      />

      {/* Inner face plate */}
      <path
        d="M250,58 L155,135 L130,235 L134,335 L155,410 L190,470 L220,505 L250,515 L280,505 L310,470 L345,410 L366,335 L370,235 L345,135 Z"
        fill="url(#faceFill)"
        stroke="rgba(168,85,247,0.1)"
        strokeWidth="0.7"
      />

      {/* Visor band */}
      <rect x="95" y="238" width="310" height="55" rx="8" fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.12)" strokeWidth="0.5" />
      <line x1="95" y1="266" x2="405" y2="266" stroke="rgba(34,211,238,0.05)" strokeWidth="0.3" />

      {/* Eyes — wake-up blink animation */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 0, 0.1, 1, 0.1, 1, 1] }}
        transition={{
          duration: 1.5,
          times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 1],
          ease: "easeOut" as const,
        }}
        style={{ transformOrigin: "250px 266px" }}
      >
        <rect x="140" y="250" width="80" height="32" rx="6" fill="url(#eyeFill)" opacity="0.95" filter="url(#glow-eye)" />
        <rect x="280" y="250" width="80" height="32" rx="6" fill="url(#eyeFill)" opacity="0.95" filter="url(#glow-eye)" />
        {/* Eye inner highlights */}
        <rect x="155" y="259" width="32" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
        <rect x="295" y="259" width="32" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
        {/* Pupil cores */}
        <circle cx="180" cy="266" r="4" fill="rgba(255,255,255,0.08)" />
        <circle cx="320" cy="266" r="4" fill="rgba(255,255,255,0.08)" />
      </motion.g>

      {/* Continuous eye glow pulse after wake-up */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.7, 1, 0.7] }}
        transition={{ duration: 3, times: [0, 0.5, 0.7, 0.85, 1], repeat: Infinity, repeatDelay: 0 }}
      >
        <ellipse cx="180" cy="266" rx="50" ry="20" fill="rgba(34,211,238,0.06)" filter="url(#glow-amb)" />
        <ellipse cx="320" cy="266" rx="50" ry="20" fill="rgba(34,211,238,0.06)" filter="url(#glow-amb)" />
      </motion.g>

      {/* Central ridge */}
      <line x1="250" y1="65" x2="250" y2="234" stroke="rgba(168,85,247,0.25)" strokeWidth="0.8" filter="url(#glow-line)" />
      <line x1="250" y1="296" x2="250" y2="508" stroke="rgba(168,85,247,0.18)" strokeWidth="0.7" filter="url(#glow-line)" />

      {/* Forehead sensor diamond */}
      <path d="M250,78 L242,90 L250,102 L258,90 Z" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.4)" strokeWidth="0.6" />

      {/* Forehead circuit traces — symmetric */}
      <path d="M250,90 L215,112 L185,118" stroke="rgba(34,211,238,0.2)" strokeWidth="0.6" fill="none" filter="url(#glow-line)" />
      <path d="M250,90 L285,112 L315,118" stroke="rgba(34,211,238,0.2)" strokeWidth="0.6" fill="none" filter="url(#glow-line)" />
      <path d="M250,118 L210,145 L180,155" stroke="rgba(168,85,247,0.14)" strokeWidth="0.5" fill="none" />
      <path d="M250,118 L290,145 L320,155" stroke="rgba(168,85,247,0.14)" strokeWidth="0.5" fill="none" />
      <path d="M185,118 L185,152" stroke="rgba(34,211,238,0.1)" strokeWidth="0.4" fill="none" />
      <path d="M315,118 L315,152" stroke="rgba(34,211,238,0.1)" strokeWidth="0.4" fill="none" />
      <path d="M250,155 L230,178 L218,190" stroke="rgba(34,211,238,0.08)" strokeWidth="0.4" fill="none" />
      <path d="M250,155 L270,178 L282,190" stroke="rgba(34,211,238,0.08)" strokeWidth="0.4" fill="none" />

      {/* Circuit nodes — symmetric */}
      <circle cx="250" cy="90" r="2.5" fill="#22d3ee" opacity="0.5" filter="url(#glow-line)" />
      <circle cx="185" cy="118" r="1.8" fill="#a855f7" opacity="0.35" />
      <circle cx="315" cy="118" r="1.8" fill="#a855f7" opacity="0.35" />
      <circle cx="250" cy="118" r="1.8" fill="#22d3ee" opacity="0.3" />
      <circle cx="250" cy="155" r="1.5" fill="#a855f7" opacity="0.25" />
      <circle cx="215" cy="112" r="1.2" fill="#22d3ee" opacity="0.2" />
      <circle cx="285" cy="112" r="1.2" fill="#22d3ee" opacity="0.2" />

      {/* Nose bridge */}
      <path d="M240,310 L250,345 L260,310" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="250" cy="345" r="1.2" fill="#22d3ee" opacity="0.12" />

      {/* Mouth line */}
      <path d="M210,390 Q230,402 250,400 Q270,402 290,390" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" fill="none" />

      {/* Cheek contour traces — symmetric */}
      <path d="M122,290 L128,330 Q135,370 155,405" stroke="rgba(34,211,238,0.14)" strokeWidth="0.6" fill="none" />
      <path d="M378,290 L372,330 Q365,370 345,405" stroke="rgba(34,211,238,0.14)" strokeWidth="0.6" fill="none" />
      <path d="M132,305 L136,340 Q142,375 160,410" stroke="rgba(168,85,247,0.07)" strokeWidth="0.4" fill="none" />
      <path d="M368,305 L364,340 Q358,375 340,410" stroke="rgba(168,85,247,0.07)" strokeWidth="0.4" fill="none" />
      <circle cx="128" cy="330" r="1.2" fill="#22d3ee" opacity="0.15" />
      <circle cx="372" cy="330" r="1.2" fill="#22d3ee" opacity="0.15" />

      {/* Jaw segments — symmetric */}
      <line x1="158" y1="435" x2="250" y2="442" stroke="rgba(34,211,238,0.12)" strokeWidth="0.6" />
      <line x1="250" y1="442" x2="342" y2="435" stroke="rgba(34,211,238,0.12)" strokeWidth="0.6" />
      <line x1="172" y1="458" x2="250" y2="465" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" />
      <line x1="250" y1="465" x2="328" y2="458" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" />
      <line x1="190" y1="478" x2="250" y2="484" stroke="rgba(34,211,238,0.06)" strokeWidth="0.4" />
      <line x1="250" y1="484" x2="310" y2="478" stroke="rgba(34,211,238,0.06)" strokeWidth="0.4" />
      <circle cx="158" cy="435" r="1.5" fill="#22d3ee" opacity="0.22" />
      <circle cx="250" cy="442" r="2" fill="#a855f7" opacity="0.28" />
      <circle cx="342" cy="435" r="1.5" fill="#22d3ee" opacity="0.22" />

      {/* Temple accent panels — symmetric */}
      <path d="M115,195 L92,230 L92,300 L115,335" stroke="rgba(168,85,247,0.16)" strokeWidth="0.7" fill="rgba(168,85,247,0.012)" />
      <path d="M385,195 L408,230 L408,300 L385,335" stroke="rgba(168,85,247,0.16)" strokeWidth="0.7" fill="rgba(168,85,247,0.012)" />
      <line x1="94" y1="255" x2="112" y2="255" stroke="rgba(34,211,238,0.08)" strokeWidth="0.4" />
      <line x1="94" y1="275" x2="108" y2="275" stroke="rgba(34,211,238,0.06)" strokeWidth="0.3" />
      <line x1="388" y1="255" x2="406" y2="255" stroke="rgba(34,211,238,0.08)" strokeWidth="0.4" />
      <line x1="392" y1="275" x2="406" y2="275" stroke="rgba(34,211,238,0.06)" strokeWidth="0.3" />
      <circle cx="92" cy="266" r="2" fill="#a855f7" opacity="0.12" />
      <circle cx="408" cy="266" r="2" fill="#a855f7" opacity="0.12" />

      {/* Neck base */}
      <path d="M200,520 L200,568 Q220,585 250,590 Q280,585 300,568 L300,520" stroke="rgba(34,211,238,0.14)" strokeWidth="0.7" fill="rgba(8,8,22,0.5)" />
      <line x1="215" y1="545" x2="285" y2="545" stroke="rgba(34,211,238,0.07)" strokeWidth="0.4" />
      <line x1="220" y1="562" x2="280" y2="562" stroke="rgba(168,85,247,0.05)" strokeWidth="0.3" />
      <circle cx="250" cy="545" r="1.5" fill="#22d3ee" opacity="0.15" />

      {/* Crown apex */}
      <path d="M250,18 L245,4 L250,-6 L255,4 Z" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5" />
      <circle cx="250" cy="0" r="1.5" fill="#a855f7" opacity="0.25" />

      {/* Cross-face micro-circuits */}
      <path d="M150,195 L175,190 L195,198" stroke="rgba(34,211,238,0.05)" strokeWidth="0.3" fill="none" />
      <path d="M350,195 L325,190 L305,198" stroke="rgba(34,211,238,0.05)" strokeWidth="0.3" fill="none" />
      <path d="M148,365 L170,358 L188,366" stroke="rgba(168,85,247,0.04)" strokeWidth="0.3" fill="none" />
      <path d="M352,365 L330,358 L312,366" stroke="rgba(168,85,247,0.04)" strokeWidth="0.3" fill="none" />
    </svg>
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
   AI Capabilities (Layer 3 floating bento cards)
   ──────────────────────────────────────────────────────────── */
const AI_CAPABILITIES = [
  {
    icon: Bot,
    title: "AI Automations & Agents",
    description: "Intelligent chatbots, workflow automation, and autonomous AI agents that operate 24/7.",
    gradient: "from-[#22d3ee]/10 to-[#2563eb]/10",
    borderColor: "border-[#22d3ee]/15",
    iconColor: "#22d3ee",
  },
  {
    icon: Globe,
    title: "Next-Gen Platforms",
    description: "Ultra-modern web platforms with real-time data, blazing performance, and immersive UI.",
    gradient: "from-[#a855f7]/10 to-[#6366f1]/10",
    borderColor: "border-[#a855f7]/15",
    iconColor: "#a855f7",
  },
  {
    icon: Layers,
    title: "Immersive 3D Experiences",
    description: "Cinematic web experiences with Three.js, spatial animations, and interactive 3D worlds.",
    gradient: "from-[#2563eb]/10 to-[#22d3ee]/10",
    borderColor: "border-[#2563eb]/15",
    iconColor: "#2563eb",
  },
];

/* ────────────────────────────────────────────────────────────
   Simulated Dashboard Stats (Layer 4)
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
   Home — Full Spatial Cinematic Experience
   4-Layer scroll-linked journey through the cosmos
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

  /* ── Scroll ── */
  const scrollProxyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollProxyRef,
    offset: ["start start", "end end"],
  });

  /* ── Layer 1: Oracle Head (0.0 → 0.4) ── */
  const headScale = useTransform(scrollYProgress, [0, 0.4], [1, 32]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.06], [0, -80]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  /* ── Layer 2: Orbiting Case Studies (0.1 → 0.45) ── */
  const cardOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.38, 0.46], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.08, 0.14, 0.38, 0.46], [0.4, 1, 1, 0.3]);

  const card1X = useTransform(scrollYProgress, (v: number) => Math.cos(v * Math.PI * 5) * 320);
  const card1Y = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5) * 110);
  const card1Z = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5) * 80);
  const card2X = useTransform(scrollYProgress, (v: number) => Math.cos(v * Math.PI * 5 + Math.PI) * 320);
  const card2Y = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5 + Math.PI) * 110);
  const card2Z = useTransform(scrollYProgress, (v: number) => Math.sin(v * Math.PI * 5 + Math.PI) * 80);

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
      `}</style>

      {/* ── Scroll proxy ── */}
      <div ref={scrollProxyRef} className="relative w-screen" style={{ height: "500vh" }}>

        {/* ── Fixed visual layer ── */}
        <div className="fixed inset-0 h-screen w-screen overflow-x-hidden" style={{ zIndex: 10 }}>

          {/* ─── Galactic Background ─── */}
          <div className="absolute inset-0 overflow-hidden" style={{ background: "#05050a" }}>
            <motion.div className="absolute" style={{ inset: "-25%", scale: nebulaScale }} animate={{ rotate: [0, 360] }} transition={{ rotate: { duration: 180, repeat: Infinity, ease: "linear" } }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 48% 42%, rgba(34,211,238,0.07) 0%, transparent 68%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 28% 58%, rgba(168,85,247,0.06) 0%, transparent 55%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 45% at 72% 38%, rgba(37,99,235,0.05) 0%, transparent 50%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 30% at 58% 68%, rgba(168,85,247,0.035) 0%, transparent 45%)" }} />
            </motion.div>
            <StarLayer stars={farStars} driftAnimation="drift-far 50s ease-in-out infinite" colorTint="rgba(200,215,255,0.85)" />
            <StarLayer stars={midStars} driftAnimation="drift-mid 38s ease-in-out infinite" colorTint="rgba(180,200,255,0.8)" />
            <StarLayer stars={nearStars} driftAnimation="drift-near 28s ease-in-out infinite" colorTint="rgba(255,255,255,0.95)" />
          </div>

          {/* ─── LAYER 1: Oracle Head Portal ─── */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
            <motion.div className="relative will-change-transform" style={{ scale: headScale, opacity: headOpacity }}>
              <div className="absolute pointer-events-none blur-3xl opacity-25" style={{ inset: "-55%", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(37,99,235,0.35) 35%, rgba(168,85,247,0.2) 60%, transparent 80%)" }} />
              <OracleHead />
            </motion.div>
          </div>

          {/* ─── LAYER 2: Orbiting Case Study Cards ─── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: "900px", transformStyle: "preserve-3d" }}>
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
                      <h3 className="text-white text-base font-semibold tracking-wide">{study.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{study.subtitle}</p>
                    </div>
                    <ArrowRight size={18} className="text-[#22d3ee]/60" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ─── LAYER 3: AI Capabilities Floating Bento Cards ─── */}
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
                        style={{ background: `rgba(${cap.iconColor === "#22d3ee" ? "34,211,238" : cap.iconColor === "#a855f7" ? "168,85,247" : "37,99,235"},0.12)` }}
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

          {/* ─── LAYER 4: Interactive AI Matrix Dashboard + CTA ─── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-y-auto"
            style={{ opacity: dashOpacity, scale: dashScale }}
          >
            <div className="w-full max-w-6xl mx-auto px-4 py-8 pointer-events-auto">

              {/* Dashboard header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#22d3ee]/20 text-[#22d3ee]/80 mb-4" style={{ background: "rgba(10,10,30,0.6)", backdropFilter: "blur(12px)" }}>
                  <Network size={14} /> NEXTGEN AI Command Center
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Real-Time <span className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">Intelligence</span>
                </h2>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {DASH_STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="backdrop-blur-xl border border-white/10 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} style={{ color: stat.color }} />
                        <span className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.change}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dashboard main grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                {/* Network visualization */}
                <div className="md:col-span-2 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", minHeight: "240px" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Network size={16} className="text-[#22d3ee]" />
                    <span className="text-white text-sm font-semibold">Neural Network Activity</span>
                    <span className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-emerald-400 text-[10px] uppercase tracking-wider font-medium">Live</span></span>
                  </div>
                  <svg className="w-full h-40" viewBox="0 0 400 160">
                    {NETWORK_NODES.map((node, ni) =>
                      NETWORK_NODES.slice(ni + 1).filter((_, li) => srand(ni * 100 + li) > 0.6).map((target, li) => (
                        <line
                          key={`l-${ni}-${li}`}
                          x1={`${node.x}%`} y1={`${node.y}%`}
                          x2={`${target.x}%`} y2={`${target.y}%`}
                          stroke="rgba(34,211,238,0.08)"
                          strokeWidth="0.5"
                          strokeDasharray="4 4"
                          style={{ animation: `data-flow ${3 + srand(ni + li) * 4}s linear infinite` }}
                        />
                      ))
                    )}
                    {NETWORK_NODES.map((node, i) => (
                      <circle
                        key={`n-${i}`}
                        cx={`${node.x}%`} cy={`${node.y}%`}
                        r={node.size}
                        fill="#22d3ee"
                        opacity="0.5"
                        style={{ animation: `node-pulse ${2 + node.pulseDelay}s ease-in-out infinite ${node.pulseDelay}s` }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Performance metrics */}
                <div className="backdrop-blur-xl border border-white/10 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={16} className="text-[#a855f7]" />
                    <span className="text-white text-sm font-semibold">Performance</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {Array.from({ length: 8 }, (_, i) => {
                      const h = srand(i * 47 + 500) * 70 + 30;
                      const clr = i % 2 === 0 ? "#22d3ee" : "#a855f7";
                      return (
                        <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(to top, ${clr}40, ${clr})`, animation: `bar-grow 1.2s ease-out ${i * 0.1}s both`, transformOrigin: "bottom" }} />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-gray-600">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Now</span>
                  </div>
                </div>
              </div>

              {/* Bottom row: AI insights + CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* AI Insights */}
                <div className="backdrop-blur-xl border border-white/10 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
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
                        <div key={item.text} className="flex items-start gap-3 p-3 rounded-xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
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

                {/* Ultimate CTA */}
                <div
                  className="backdrop-blur-xl border border-[#22d3ee]/15 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(34,211,238,0.06) 0%, transparent 60%)" }} />
                  <div className="relative">
                    <Sparkles size={32} className="text-[#22d3ee] mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      Ready to Automate<br />Your Future?
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                      Join 500+ companies leveraging NEXTGEN AI to transform their digital presence.
                    </p>
                    <Link
                      href="/builder"
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] via-[#2563eb] to-[#a855f7] px-8 py-4 text-white text-base font-semibold transition-all hover:shadow-[0_0_50px_rgba(34,211,238,0.35)] hover:scale-105"
                    >
                      Start Your Project
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
              style={{ background: "rgba(10,10,30,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
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
            <span className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-3">Scroll</span>
            <div className="w-5 h-9 rounded-full border border-gray-700/60 flex items-start justify-center pt-1.5" style={{ animation: "scroll-bounce 2.2s ease-in-out infinite" }}>
              <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-[#22d3ee] to-[#a855f7]" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
