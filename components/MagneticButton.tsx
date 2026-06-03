"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 0.38, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = rect.width * 1.3;
      if (dist < radius) {
        const pull = 1 - dist / radius;
        x.set(dx * pull * strength);
        y.set(dy * pull * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className={`inline-flex ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}
