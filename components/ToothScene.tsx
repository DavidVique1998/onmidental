"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";

// Shared global — updated by whichever scroll listener fires
const rotState = { scrollY: 0 };

function ToothModel({ src, scaleFactor }: { src: string; scaleFactor: number }) {
  const ref = useRef<THREE.Group>(null);
  const prevScrollY = useRef(0);
  const { scene } = useGLTF(src);
  const [fit, setFit] = useState<{ offset: [number, number, number]; scale: number } | null>(null);

  useEffect(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    setFit({ offset: [-center.x, -center.y, -center.z], scale: scaleFactor / maxDim });
  }, [scene, scaleFactor]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const scrollDelta = rotState.scrollY - prevScrollY.current;
    prevScrollY.current = rotState.scrollY;
    ref.current.rotation.y += delta * 0.15 + scrollDelta * 0.008;
  });

  if (!fit) return null;

  return (
    <group ref={ref}>
      <group scale={fit.scale}>
        <group position={fit.offset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 8, 5]} intensity={3} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#C9956A" />
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#ffffff" />
    </>
  );
}

const DEFAULT_SRC = "/3d/mandibular_first_molar.glb";

export default function ToothScene({ src = DEFAULT_SRC, scaleFactor = 2.2 }: { src?: string; scaleFactor?: number }) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      rotState.scrollY = window.scrollY;
      setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
        shadows
      >
        <Lights />
        <Suspense fallback={null}>
          <ToothModel src={src} scaleFactor={scaleFactor} />
        </Suspense>
      </Canvas>

      {/* Scroll hint — bottom right, fades out after first scroll */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="absolute bottom-5 right-5 pointer-events-none flex flex-col items-center gap-1.5"
          >
            {/* Mouse body */}
            <div className="w-5 h-8 rounded-full border-[1.5px] border-[#C9956A]/55 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[3px] h-[5px] rounded-full bg-[#C9956A]/70"
              />
            </div>
            <span
              className="font-black uppercase tracking-[0.18em]"
              style={{ fontSize: "8px", color: "rgba(201,149,106,0.55)" }}
            >
              Scroll para girar
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

useGLTF.preload("/3d/mandibular_first_molar.glb");
useGLTF.preload("/3d/adult_tooth_morphology.glb");
