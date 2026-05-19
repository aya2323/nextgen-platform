"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";

interface Props {
  company: string;
  industry: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

function generateParticleData() {
  const positions: [number, number, number][] = [];
  const sizes: number[] = [];
  for (let i = 0; i < 200; i++) {
    positions.push([
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ]);
    sizes.push(0.02 + Math.random() * 0.04);
  }
  return { positions, sizes };
}

const PARTICLE_DATA = generateParticleData();

function generateRingData() {
  const rings: { radius: number; speed: number; axis: [number, number, number] }[] = [];
  for (let i = 0; i < 5; i++) {
    rings.push({
      radius: 1.2 + i * 0.5,
      speed: 0.3 + Math.random() * 0.4,
      axis: [
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ],
    });
  }
  return rings;
}

const RING_DATA = generateRingData();

function ParticleField({ primaryColor }: { primaryColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {PARTICLE_DATA.positions.map((pos, i) => (
        <mesh key={`p-${i}`} position={pos}>
          <sphereGeometry args={[PARTICLE_DATA.sizes[i], 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? primaryColor : "#ffffff"}
            transparent
            opacity={0.4 + (i % 5) * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalRings({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX.current * 0.6 + t * 0.15,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY.current * 0.4,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central distorted sphere */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[0.8, 4]} />
          <MeshDistortMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            distort={0.4}
            speed={3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      {RING_DATA.map((ring, i) => {
        const curve = new THREE.EllipseCurve(
          0,
          0,
          ring.radius,
          ring.radius * (0.8 + (i % 2) * 0.4),
          0,
          2 * Math.PI,
          false,
          0
        );
        const points2D = curve.getPoints(64);
        const points3D = points2D.map(
          (p) => new THREE.Vector3(p.x, 0, p.y)
        );
        const geo = new THREE.BufferGeometry().setFromPoints(points3D);
        const mat = new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? primaryColor : secondaryColor,
          transparent: true,
          opacity: 0.25 + i * 0.05,
        });
        const lineObj = new THREE.Line(geo, mat);
        return (
          <group
            key={`ring-${i}`}
            rotation={[
              ring.axis[0] * Math.PI,
              ring.axis[1] * Math.PI,
              ring.axis[2] * Math.PI,
            ]}
          >
            <primitive object={lineObj} />
          </group>
        );
      })}

      {/* Wireframe outer sphere */}
      <mesh>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial
          color={secondaryColor}
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>

      <ParticleField primaryColor={primaryColor} />
    </group>
  );
}

function DynamicScene({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  const { viewport } = useThree();
  const scaleFactor = viewport.width > 6 ? 1 : 0.65;

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color={primaryColor} />
      <pointLight
        position={[-5, -3, 3]}
        intensity={0.5}
        color={secondaryColor}
      />
      <group scale={scaleFactor}>
        <OrbitalRings
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </group>
    </>
  );
}

export default function DynamicShowcaseDemo({
  company,
  industry,
  primaryColor,
  secondaryColor,
  accentColor,
}: Props) {
  const services = [
    {
      icon: Cpu,
      title: "Neural Processing",
      desc: "Advanced AI models trained on your industry data for precision decisions.",
    },
    {
      icon: Layers,
      title: "Multi-Layer Architecture",
      desc: "Scalable infrastructure that grows with your business demands.",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      desc: "Forecast trends and capitalize on opportunities before competitors.",
    },
    {
      icon: Globe,
      title: "Global Deployment",
      desc: "Edge computing infrastructure for sub-50ms response worldwide.",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      desc: "Process millions of data points per second with zero latency.",
    },
    {
      icon: Sparkles,
      title: "AI Automation",
      desc: "Automate complex workflows with intelligent decision-making.",
    },
  ];

  const phases = [
    {
      num: "01",
      title: "Discover",
      desc: "Deep analysis of your business model, audience, and growth objectives.",
    },
    {
      num: "02",
      title: "Design",
      desc: "AI-driven architecture tailored to your specific industry requirements.",
    },
    {
      num: "03",
      title: "Deploy",
      desc: "Launch your intelligent platform with real-time monitoring and optimization.",
    },
    {
      num: "04",
      title: "Evolve",
      desc: "Continuous learning and adaptation to maximize ROI quarter over quarter.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "#06060c" }}
    >
      {/* Hero with Three.js Scene */}
      <section className="relative overflow-hidden">
        <div className="h-[500px] w-full">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ background: "transparent" }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <DynamicScene
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </Suspense>
          </Canvas>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}40`,
                background: `${accentColor}10`,
              }}
            >
              <Sparkles size={14} />
              Interactive Experience
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl"
            >
              <span
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {company}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 max-w-lg mx-auto drop-shadow-lg"
            >
              Next-generation {industry.toLowerCase()} intelligence. Move your
              mouse to explore.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-white mb-3">
              Powered by{" "}
              <span style={{ color: primaryColor }}>
                Advanced AI
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Six pillars of intelligent technology working in harmony for your{" "}
              {industry.toLowerCase()} business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="p-6 rounded-xl border group transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: `${primaryColor}15`,
                  background: "#0a0a16",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                  }}
                >
                  <s.icon
                    size={20}
                    style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }}
                  />
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section
        className="px-8 md:px-16 py-20"
        style={{ background: `${primaryColor}05` }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            Our{" "}
            <span style={{ color: secondaryColor }}>Process</span>
          </h2>
          <div className="space-y-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.12 }}
                className="flex items-start gap-6 p-6 rounded-xl border"
                style={{
                  borderColor: `${primaryColor}15`,
                  background: "#08080f",
                }}
              >
                <div
                  className="text-3xl font-black shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {phase.num}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at center, ${primaryColor}, transparent 70%)`,
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the future of{" "}
            <span style={{ color: accentColor }}>{industry.toLowerCase()}</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Interactive, immersive, and intelligent. Built for brands that refuse
            to blend in.
          </p>
          <button
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 0 40px ${primaryColor}30`,
            }}
          >
            Launch Your Project <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
