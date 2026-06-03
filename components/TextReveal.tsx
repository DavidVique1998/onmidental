"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Word({
  children,
  progress,
  range,
  color,
  dimColor,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  color: string;
  dimColor: string;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mx-[0.22em] my-[0.1em]">
      <span style={{ color: dimColor }} className="select-none">{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity, color }}>
        {children}
      </motion.span>
    </span>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  color?: string;
  dimColor?: string;
}

export default function TextReveal({
  text,
  className = "",
  color = "#111111",
  dimColor = "rgba(17,17,17,0.15)",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap leading-[1.15]">
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            color={color}
            dimColor={dimColor}
          >
            {word}
          </Word>
        ))}
      </p>
    </div>
  );
}
