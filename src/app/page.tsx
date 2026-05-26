"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

/* ────────────────────────────────────────────────────────────
   Deterministic PRNG — identical output on server + client
   to prevent React hydration mismatches.
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
  opacity: number;
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
      opacity: srand(s * 11 + 4) * 0.6 + 0.3,
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
   Home — Spatial Cinematic Experience
   Phase 1: One-box viewport, galactic starfield
   Phase 2: 3D Oracle Head (real image), orbiting case studies
   Phase 3: AI Video showcase portal
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

  /* ── Scroll proxy ref ── */
  const scrollProxyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollProxyRef,
    offset: ["start start", "end end"],
  });

  /* ── Oracle Head transforms ── */
  const headScale = useTransform(scrollYProgress, [0, 0.55], [1, 25]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.38, 0.56], [1, 1, 0]);

  /* ── Hero text ── */
  const textOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.08], [0, -80]);

  /* ── Nebula ── */
  const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  /* ── Scroll hint ── */
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  /* ── Orbiting case study cards ── */
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.12, 0.42, 0.52],
    [0, 1, 1, 0],
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0.06, 0.12, 0.42, 0.52],
    [0.5, 1, 1, 0.4],
  );

  const card1X = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5;
    return Math.cos(angle) * 260;
  });
  const card1Y = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5;
    return Math.sin(angle) * 90;
  });
  const card1Z = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5;
    return Math.sin(angle) * 50;
  });

  const card2X = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5 + Math.PI;
    return Math.cos(angle) * 260;
  });
  const card2Y = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5 + Math.PI;
    return Math.sin(angle) * 90;
  });
  const card2Z = useTransform(scrollYProgress, (v: number) => {
    const angle = v * Math.PI * 5 + Math.PI;
    return Math.sin(angle) * 50;
  });

  /* ── AI Video Showcase ── */
  const videoOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.7, 0.96, 1],
    [0, 1, 1, 0.9],
  );
  const videoScale = useTransform(scrollYProgress, [0.58, 0.74], [0.6, 1]);

  /* ── Star data (memoised, deterministic) ── */
  const farStars = useMemo(() => generateStars(80, 0, 0.5, 1.5), []);
  const midStars = useMemo(() => generateStars(50, 500, 1.2, 2.5), []);
  const nearStars = useMemo(() => generateStars(18, 1000, 2.2, 3.8), []);

  const cardRefs = [
    { x: card1X, y: card1Y, z: card1Z },
    { x: card2X, y: card2Y, z: card2Z },
  ];

  return (
    <>
      {/* Inline keyframes */}
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
          0%, 100% { box-shadow: 0 0 18px rgba(34,211,238,0.8), 0 0 55px rgba(37,99,235,0.4); }
          50% { box-shadow: 0 0 28px rgba(34,211,238,1), 0 0 80px rgba(37,99,235,0.6); }
        }
      `}</style>

      {/* ── Scroll proxy: tall container that generates scroll distance ── */}
      <div
        ref={scrollProxyRef}
        className="relative w-screen"
        style={{ height: "600vh" }}
      >
        {/* ── Fixed visual layer ── */}
        <div
          className="fixed inset-0 h-screen w-screen overflow-x-hidden"
          style={{ zIndex: 10 }}
        >
          {/* ─── Galactic Background ─── */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ background: "#05050a" }}
          >
            {/* Nebula — shifting radial gradients */}
            <motion.div
              className="absolute"
              style={{ inset: "-25%", scale: nebulaScale }}
              animate={{ rotate: [0, 360] }}
              transition={{
                rotate: { duration: 180, repeat: Infinity, ease: "linear" },
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 55% at 48% 42%, rgba(37,99,235,0.09) 0%, transparent 68%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 28% 58%, rgba(168,85,247,0.065) 0%, transparent 55%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 45% 45% at 72% 38%, rgba(37,99,235,0.055) 0%, transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 35% 30% at 58% 68%, rgba(168,85,247,0.04) 0%, transparent 45%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 25% 40% at 15% 25%, rgba(37,99,235,0.035) 0%, transparent 40%)",
                }}
              />
            </motion.div>

            {/* Star layers — 3 depth tiers */}
            <StarLayer
              stars={farStars}
              driftAnimation="drift-far 50s ease-in-out infinite"
              colorTint="rgba(200,215,255,0.85)"
            />
            <StarLayer
              stars={midStars}
              driftAnimation="drift-mid 38s ease-in-out infinite"
              colorTint="rgba(180,200,255,0.8)"
            />
            <StarLayer
              stars={nearStars}
              driftAnimation="drift-near 28s ease-in-out infinite"
              colorTint="rgba(255,255,255,0.95)"
            />
          </div>

          {/* ─── Oracle Head Portal — Real 3D Image ─── */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="relative will-change-transform"
              style={{ scale: headScale, opacity: headOpacity }}
            >
              {/* Studio lighting — massive blurred gradient behind head */}
              <div
                className="absolute blur-3xl opacity-30 pointer-events-none"
                style={{
                  inset: "-50%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(37,99,235,0.4) 30%, rgba(168,85,247,0.25) 55%, transparent 75%)",
                }}
              />

              {/* 3D Robot head image */}
              <Image
                src="/robot-3d.png"
                alt="3D AI Oracle Head"
                width={600}
                height={780}
                priority
                className="relative w-[38vmin] h-auto object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 40px rgba(34,211,238,0.12)) drop-shadow(0 0 80px rgba(37,99,235,0.08))",
                }}
              />

              {/* Wake-up eye glow overlay — left eye */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "32%",
                  left: "33%",
                  width: "12%",
                  height: "3%",
                  background:
                    "radial-gradient(ellipse, rgba(34,211,238,0.95) 0%, rgba(37,99,235,0.5) 55%, transparent 100%)",
                  animation: "eye-pulse 3s ease-in-out infinite",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut" as const,
                  delay: 0.4,
                }}
              />

              {/* Wake-up eye glow overlay — right eye */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "32%",
                  left: "53%",
                  width: "12%",
                  height: "3%",
                  background:
                    "radial-gradient(ellipse, rgba(34,211,238,0.95) 0%, rgba(37,99,235,0.5) 55%, transparent 100%)",
                  animation: "eye-pulse 3s ease-in-out infinite 0.3s",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut" as const,
                  delay: 0.6,
                }}
              />
            </motion.div>
          </div>

          {/* ─── Orbiting Case Study Cards ─── */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            {CASE_STUDIES.map((study, i) => (
              <motion.a
                key={study.link}
                href={study.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute pointer-events-auto backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]"
                style={{
                  width: "clamp(180px, 20vw, 300px)",
                  x: cardRefs[i].x,
                  y: cardRefs[i].y,
                  z: cardRefs[i].z,
                  opacity: cardOpacity,
                  scale: cardScale,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div className="p-3">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={400}
                      height={250}
                      className="w-full object-cover"
                      style={{ aspectRatio: "16/10" }}
                    />
                  </div>
                  <h3 className="mt-3 text-white text-sm font-semibold tracking-wide">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{study.subtitle}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ─── AI Video Showcase Portal ─── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: videoOpacity, scale: videoScale }}
          >
            <div
              className="relative backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                width: "clamp(280px, 58vw, 860px)",
                background: "rgba(255,255,255,0.04)",
                boxShadow:
                  "0 0 60px rgba(37,99,235,0.1), 0 0 120px rgba(168,85,247,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="p-3">
                <video
                  src="/skin-ai.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full rounded-xl"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
              <div className="px-5 pb-4 pt-1 flex items-center justify-between">
                <div>
                  <span className="text-white text-sm font-semibold">
                    AI Skin Analysis
                  </span>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Live demo — powered by NEXTGEN AI
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[10px] uppercase tracking-wider font-medium">
                    Live
                  </span>
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#2563eb]/20 text-[#2563eb]/80 mb-5"
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
              <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-[#2563eb] to-[#a855f7]" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
