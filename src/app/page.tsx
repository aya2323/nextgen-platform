"use client";

import { useEffect, useMemo, useRef } from "react";
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
   Oracle Head — Premium Cybernetic AI Robot Head
   High-fidelity SVG composition with glow filters,
   circuit traces, angular cranium, animated blink eyes.
   ──────────────────────────────────────────────────────────── */
function OracleHead() {
  return (
    <svg
      viewBox="0 0 400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[38vmin] h-auto"
      style={{ filter: "drop-shadow(0 0 80px rgba(37,99,235,0.12))" }}
    >
      <defs>
        <filter id="glow-ambient" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
        <filter id="glow-eye" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-circuit" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="craniumFill" x1="200" y1="20" x2="200" y2="475" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16163a" />
          <stop offset="35%" stopColor="#0e0e28" />
          <stop offset="100%" stopColor="#08081a" />
        </linearGradient>
        <linearGradient id="innerFaceFill" x1="200" y1="52" x2="200" y2="444" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111130" />
          <stop offset="100%" stopColor="#0a0a1e" />
        </linearGradient>
        <linearGradient id="eyeFill" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="visorFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(37,99,235,0.02)" />
          <stop offset="50%" stopColor="rgba(37,99,235,0.1)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0.02)" />
        </linearGradient>
      </defs>

      {/* Ambient glow behind head */}
      <ellipse cx="200" cy="260" rx="190" ry="240" fill="rgba(37,99,235,0.035)" filter="url(#glow-ambient)" />
      <ellipse cx="200" cy="230" rx="120" ry="140" fill="rgba(168,85,247,0.02)" filter="url(#glow-ambient)" />

      {/* Outer cranium — angular polygon */}
      <path
        d="M200,20 L105,115 L82,245 L115,395 L165,455 L200,472 L235,455 L285,395 L318,245 L295,115 Z"
        fill="url(#craniumFill)"
        stroke="rgba(37,99,235,0.3)"
        strokeWidth="1.2"
      />
      {/* Cranium inner edge highlight */}
      <path
        d="M200,24 L110,117 L87,244 L118,392 L167,452 L200,468 L233,452 L282,392 L313,244 L290,117 Z"
        fill="none"
        stroke="rgba(168,85,247,0.08)"
        strokeWidth="0.5"
      />

      {/* Inner face plate */}
      <path
        d="M200,52 L128,132 L112,242 L138,378 L172,432 L200,444 L228,432 L262,378 L288,242 L272,132 Z"
        fill="url(#innerFaceFill)"
        stroke="rgba(168,85,247,0.12)"
        strokeWidth="0.7"
      />

      {/* Visor band across eye area */}
      <rect x="78" y="198" width="244" height="48" rx="6" fill="url(#visorFill)" stroke="rgba(37,99,235,0.12)" strokeWidth="0.5" />
      <line x1="78" y1="222" x2="322" y2="222" stroke="rgba(37,99,235,0.06)" strokeWidth="0.3" />

      {/* Eyes — blink animation */}
      <motion.g
        initial={{ scaleY: 1 }}
        animate={{ scaleY: [1, 1, 0.04, 1, 1, 1, 0.04, 1] }}
        transition={{
          duration: 5,
          times: [0, 0.37, 0.41, 0.45, 0.84, 0.89, 0.93, 1],
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut" as const,
        }}
        style={{ transformOrigin: "200px 222px" }}
      >
        <rect x="115" y="208" width="70" height="28" rx="5" fill="url(#eyeFill)" opacity="0.92" filter="url(#glow-eye)" />
        <rect x="215" y="208" width="70" height="28" rx="5" fill="url(#eyeFill)" opacity="0.92" filter="url(#glow-eye)" />
      </motion.g>

      {/* Eye inner highlights */}
      <rect x="130" y="217" width="30" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="230" y="217" width="30" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
      {/* Eye pupil dots */}
      <circle cx="150" cy="222" r="3" fill="rgba(255,255,255,0.06)" />
      <circle cx="250" cy="222" r="3" fill="rgba(255,255,255,0.06)" />

      {/* Central ridge — forehead to chin */}
      <line x1="200" y1="58" x2="200" y2="195" stroke="rgba(168,85,247,0.28)" strokeWidth="0.8" filter="url(#glow-circuit)" />
      <line x1="200" y1="250" x2="200" y2="438" stroke="rgba(168,85,247,0.2)" strokeWidth="0.7" filter="url(#glow-circuit)" />

      {/* Forehead diamond sensor */}
      <path d="M200,66 L193,75 L200,84 L207,75 Z" fill="rgba(37,99,235,0.12)" stroke="rgba(37,99,235,0.45)" strokeWidth="0.6" />

      {/* Forehead circuit traces — upper */}
      <path d="M200,75 L170,98 L145,102" stroke="rgba(37,99,235,0.2)" strokeWidth="0.6" fill="none" filter="url(#glow-circuit)" />
      <path d="M200,75 L230,98 L255,102" stroke="rgba(37,99,235,0.2)" strokeWidth="0.6" fill="none" filter="url(#glow-circuit)" />
      {/* Forehead circuit traces — lower */}
      <path d="M200,105 L165,128 L142,138" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" fill="none" />
      <path d="M200,105 L235,128 L258,138" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" fill="none" />
      {/* Vertical connectors */}
      <path d="M145,102 L145,135" stroke="rgba(37,99,235,0.12)" strokeWidth="0.4" fill="none" />
      <path d="M255,102 L255,135" stroke="rgba(37,99,235,0.12)" strokeWidth="0.4" fill="none" />
      {/* Inner forehead branches */}
      <path d="M200,140 L183,162" stroke="rgba(37,99,235,0.1)" strokeWidth="0.4" fill="none" />
      <path d="M200,140 L217,162" stroke="rgba(37,99,235,0.1)" strokeWidth="0.4" fill="none" />
      <path d="M200,155 L190,175 L178,180" stroke="rgba(168,85,247,0.08)" strokeWidth="0.3" fill="none" />
      <path d="M200,155 L210,175 L222,180" stroke="rgba(168,85,247,0.08)" strokeWidth="0.3" fill="none" />

      {/* Circuit nodes */}
      <circle cx="200" cy="75" r="2.5" fill="#2563eb" opacity="0.55" filter="url(#glow-circuit)" />
      <circle cx="145" cy="102" r="1.8" fill="#a855f7" opacity="0.4" />
      <circle cx="255" cy="102" r="1.8" fill="#a855f7" opacity="0.4" />
      <circle cx="200" cy="105" r="1.8" fill="#2563eb" opacity="0.35" />
      <circle cx="200" cy="140" r="1.5" fill="#a855f7" opacity="0.28" />
      <circle cx="170" cy="98" r="1.2" fill="#2563eb" opacity="0.22" />
      <circle cx="230" cy="98" r="1.2" fill="#2563eb" opacity="0.22" />
      <circle cx="142" cy="138" r="1" fill="#a855f7" opacity="0.2" />
      <circle cx="258" cy="138" r="1" fill="#a855f7" opacity="0.2" />

      {/* Cheek contour traces */}
      <path d="M104,252 L110,288 Q116,322 132,352" stroke="rgba(37,99,235,0.16)" strokeWidth="0.6" fill="none" />
      <path d="M296,252 L290,288 Q284,322 268,352" stroke="rgba(37,99,235,0.16)" strokeWidth="0.6" fill="none" />
      <path d="M114,268 L118,298 Q122,328 138,358" stroke="rgba(168,85,247,0.08)" strokeWidth="0.4" fill="none" />
      <path d="M286,268 L282,298 Q278,328 262,358" stroke="rgba(168,85,247,0.08)" strokeWidth="0.4" fill="none" />
      {/* Cheek nodes */}
      <circle cx="110" cy="288" r="1.2" fill="#2563eb" opacity="0.18" />
      <circle cx="290" cy="288" r="1.2" fill="#2563eb" opacity="0.18" />

      {/* Nose bridge */}
      <path d="M192,260 L200,290 L208,260" stroke="rgba(37,99,235,0.1)" strokeWidth="0.5" fill="none" />
      <circle cx="200" cy="290" r="1.2" fill="#2563eb" opacity="0.15" />

      {/* Mouth line */}
      <path d="M172,340 Q186,350 200,348 Q214,350 228,340" stroke="rgba(37,99,235,0.12)" strokeWidth="0.5" fill="none" />

      {/* Jaw segment lines */}
      <line x1="135" y1="378" x2="200" y2="384" stroke="rgba(37,99,235,0.14)" strokeWidth="0.6" />
      <line x1="200" y1="384" x2="265" y2="378" stroke="rgba(37,99,235,0.14)" strokeWidth="0.6" />
      <line x1="148" y1="398" x2="200" y2="406" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
      <line x1="200" y1="406" x2="252" y2="398" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
      <line x1="162" y1="418" x2="200" y2="424" stroke="rgba(37,99,235,0.08)" strokeWidth="0.4" />
      <line x1="200" y1="424" x2="238" y2="418" stroke="rgba(37,99,235,0.08)" strokeWidth="0.4" />
      {/* Jaw nodes */}
      <circle cx="135" cy="378" r="1.5" fill="#2563eb" opacity="0.25" />
      <circle cx="200" cy="384" r="2" fill="#a855f7" opacity="0.3" />
      <circle cx="265" cy="378" r="1.5" fill="#2563eb" opacity="0.25" />

      {/* Temple accent panels */}
      <path d="M98,162 L78,195 L78,250 L98,282" stroke="rgba(168,85,247,0.18)" strokeWidth="0.7" fill="rgba(168,85,247,0.015)" />
      <path d="M302,162 L322,195 L322,250 L302,282" stroke="rgba(168,85,247,0.18)" strokeWidth="0.7" fill="rgba(168,85,247,0.015)" />
      {/* Temple horizontal details */}
      <line x1="80" y1="212" x2="95" y2="212" stroke="rgba(37,99,235,0.1)" strokeWidth="0.4" />
      <line x1="80" y1="228" x2="92" y2="228" stroke="rgba(37,99,235,0.08)" strokeWidth="0.3" />
      <line x1="80" y1="242" x2="90" y2="242" stroke="rgba(168,85,247,0.06)" strokeWidth="0.3" />
      <line x1="305" y1="212" x2="320" y2="212" stroke="rgba(37,99,235,0.1)" strokeWidth="0.4" />
      <line x1="308" y1="228" x2="320" y2="228" stroke="rgba(37,99,235,0.08)" strokeWidth="0.3" />
      <line x1="310" y1="242" x2="320" y2="242" stroke="rgba(168,85,247,0.06)" strokeWidth="0.3" />

      {/* Ear nodes */}
      <circle cx="78" cy="222" r="2" fill="#a855f7" opacity="0.15" />
      <circle cx="322" cy="222" r="2" fill="#a855f7" opacity="0.15" />

      {/* Neck base */}
      <path d="M168,448 L168,488 Q182,502 200,506 Q218,502 232,488 L232,448" stroke="rgba(37,99,235,0.16)" strokeWidth="0.7" fill="rgba(8,8,22,0.6)" />
      <line x1="178" y1="468" x2="222" y2="468" stroke="rgba(37,99,235,0.08)" strokeWidth="0.4" />
      <line x1="182" y1="482" x2="218" y2="482" stroke="rgba(168,85,247,0.06)" strokeWidth="0.3" />
      <circle cx="200" cy="468" r="1.5" fill="#2563eb" opacity="0.18" />
      <circle cx="200" cy="488" r="1" fill="#a855f7" opacity="0.12" />

      {/* Crown apex */}
      <path d="M200,20 L195,6 L200,-5 L205,6 Z" fill="rgba(168,85,247,0.18)" stroke="rgba(168,85,247,0.35)" strokeWidth="0.5" />
      <circle cx="200" cy="1" r="1.5" fill="#a855f7" opacity="0.3" />

      {/* Additional cross-face circuits for density */}
      <path d="M128,175 L150,172 L165,180" stroke="rgba(37,99,235,0.06)" strokeWidth="0.3" fill="none" />
      <path d="M272,175 L250,172 L235,180" stroke="rgba(37,99,235,0.06)" strokeWidth="0.3" fill="none" />
      <path d="M125,310 L145,305 L160,312" stroke="rgba(168,85,247,0.05)" strokeWidth="0.3" fill="none" />
      <path d="M275,310 L255,305 L240,312" stroke="rgba(168,85,247,0.05)" strokeWidth="0.3" fill="none" />
    </svg>
  );
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
   Home — Phase 1: Spatial Cinematic Experience
   One-box viewport, galactic starfield, Oracle Head portal
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

  /* ── Scroll-linked transforms ── */
  const headScale = useTransform(scrollYProgress, [0, 0.78], [1, 20]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.52, 0.78], [1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, -80]);
  const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  /* ── Star data (memoised, deterministic) ── */
  const farStars = useMemo(() => generateStars(80, 0, 0.5, 1.5), []);
  const midStars = useMemo(() => generateStars(50, 500, 1.2, 2.5), []);
  const nearStars = useMemo(() => generateStars(18, 1000, 2.2, 3.8), []);

  return (
    <>
      {/* Inline keyframes for star animations */}
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
      `}</style>

      {/* ── Scroll proxy: tall container that generates scroll distance ── */}
      <div ref={scrollProxyRef} className="relative w-screen" style={{ height: "500vh" }}>

        {/* ── Fixed visual layer ── */}
        <div className="fixed inset-0 h-screen w-screen overflow-x-hidden" style={{ zIndex: 10 }}>

          {/* ─── Galactic Background ─── */}
          <div className="absolute inset-0 overflow-hidden" style={{ background: "#05050a" }}>

            {/* Nebula — shifting radial gradients */}
            <motion.div
              className="absolute"
              style={{
                inset: "-25%",
                scale: nebulaScale,
              }}
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

            {/* Star layers — 3 depth tiers with independent drift */}
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

          {/* ─── Oracle Head Portal ─── */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="will-change-transform"
              style={{ scale: headScale, opacity: headOpacity }}
            >
              <OracleHead />
            </motion.div>
          </div>

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
