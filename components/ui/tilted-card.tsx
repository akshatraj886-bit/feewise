"use client";

import React, { useRef, useState, type MouseEvent, type ReactNode } from "react";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareEffect?: boolean;
  glowColor?: string;
  borderGlow?: boolean;
}

export function TiltedCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.03,
  glareEffect = true,
  glowColor = "rgba(82, 99, 232, 0.35)",
  borderGlow = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.75,
    });
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div
      style={{ perspective: "1000px" }}
      className="inline-block w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
          isHovered ? "shadow-2xl" : "shadow-md"
        } ${className}`}
      >
        {/* Dynamic 3D Spotlight Glow */}
        {borderGlow && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 70%)`,
            }}
          />
        )}

        {/* 3D Glare Reflection */}
        {glareEffect && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), transparent 80%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}

export default TiltedCard;
