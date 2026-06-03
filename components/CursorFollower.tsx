"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  dotColor?: string;
  ringColor?: string;
  dotSize?: number;
  ringSize?: number;
  ringHoverSize?: number;
}

export default function CursorFollower({
  dotColor = "#C9956A",
  ringColor = "rgba(201,149,106,0.45)",
  dotSize = 6,
  ringSize = 28,
  ringHoverSize = 46,
}: Props) {
  const mouse = useRef({ x: -200, y: -200 });
  const dotRef = useRef({ x: -200, y: -200 });
  const ringRef = useRef({ x: -200, y: -200 });
  const [dotPos, setDotPos] = useState({ x: -200, y: -200 });
  const [ringPos, setRingPos] = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    const bindInteractives = () => {
      document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };
    bindInteractives();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let animId: number;
    const tick = () => {
      dotRef.current.x = lerp(dotRef.current.x, mouse.current.x, 0.28);
      dotRef.current.y = lerp(dotRef.current.y, mouse.current.y, 0.28);
      ringRef.current.x = lerp(ringRef.current.x, mouse.current.x, 0.1);
      ringRef.current.y = lerp(ringRef.current.y, mouse.current.y, 0.1);
      setDotPos({ x: dotRef.current.x, y: dotRef.current.y });
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  if (isTouch) return null;

  const rs = hovering ? ringHoverSize : ringSize;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: dotColor,
          left: dotPos.x,
          top: dotPos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: rs,
          height: rs,
          border: `1.5px solid ${ringColor}`,
          left: ringPos.x,
          top: ringPos.y,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s",
        }}
      />
    </div>
  );
}
