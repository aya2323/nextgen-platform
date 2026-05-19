"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";

function generateBrainData() {
  const curves: { points: [number, number, number][] }[] = [];
  for (let i = 0; i < 60; i++) {
    const pts: [number, number, number][] = [];
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const baseRadius = 1.8;
    for (let j = 0; j < 8; j++) {
      const t = j / 7;
      const r =
        baseRadius *
        (0.6 + 0.4 * Math.sin(phi + t * 3)) *
        (0.7 + 0.3 * Math.cos(theta + t * 2));
      const wobble = 0.15;
      pts.push([
        r * Math.sin(theta + t * 1.5) * Math.cos(phi + t * 0.8) +
          (Math.random() - 0.5) * wobble,
        r * Math.cos(theta + t * 1.2) +
          (Math.random() - 0.5) * wobble,
        r * Math.sin(theta + t * 1.5) * Math.sin(phi + t * 0.8) +
          (Math.random() - 0.5) * wobble,
      ]);
    }
    curves.push({ points: pts });
  }

  const nodes: { pos: [number, number, number]; size: number }[] = [];
  for (let i = 0; i < 120; i++) {
    const r = 1.6 + Math.random() * 0.4;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * Math.PI * 2;
    nodes.push({
      pos: [
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.cos(theta),
        r * Math.sin(theta) * Math.sin(phi),
      ],
      size: 0.025 + Math.random() * 0.02,
    });
  }

  const opacities = curves.map(() => 0.6 + Math.random() * 0.3);

  return { curves, nodes, opacities };
}

const BRAIN_DATA = generateBrainData();

function CircuitBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const { viewport } = useThree();

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
      mouseX.current * 0.5 + t * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY.current * 0.3,
      0.05
    );
    const scale = 1 + Math.sin(t * 1.5) * 0.03;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} scale={viewport.width > 6 ? 1 : 0.7}>
      {BRAIN_DATA.curves.map((curve, i) => {
        const vectors = curve.points.map(
          (p) => new THREE.Vector3(p[0], p[1], p[2])
        );
        const catmull = new THREE.CatmullRomCurve3(vectors);
        const tubeGeo = new THREE.TubeGeometry(catmull, 32, 0.015, 6, false);
        const isBlue = i % 2 === 0;
        return (
          <mesh key={`curve-${i}`} geometry={tubeGeo}>
            <meshBasicMaterial
              color={isBlue ? "#2563eb" : "#a855f7"}
              transparent
              opacity={BRAIN_DATA.opacities[i]}
            />
          </mesh>
        );
      })}

      {BRAIN_DATA.nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.pos}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#a855f7" : "#2563eb"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>
    </group>
  );
}

function RadialGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <circleGeometry args={[3, 64]} />
      <meshBasicMaterial
        color="#2563eb"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function BrainScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#2563eb]/5 via-transparent to-transparent pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#2563eb" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a855f7" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <CircuitBrain />
          </Float>
          <RadialGlow />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
