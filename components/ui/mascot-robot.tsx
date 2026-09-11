"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Bot, Rotate3d, Zap } from "lucide-react";

interface MascotRobotProps {
  className?: string;
  hoveredRole?: string | null;
}

export function MascotRobot({ className = "", hoveredRole }: MascotRobotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorRotation, setCursorRotation] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string>("👋 Hi! I'm finBot. Move your cursor to see me look in 3D!");

  // Dynamic reaction when user hovers over different role cards
  useEffect(() => {
    if (hoveredRole === "admin") {
      setSpeech("👑 Welcome CEO Ramamurthy! Executive command center ready.");
    } else if (hoveredRole === "finance-officer") {
      setSpeech("💼 Welcome Comptroller Priya! Ready to audit ledger discrepancies.");
    } else if (hoveredRole === "student") {
      setSpeech("🎓 Hi Akshat! Ready to view fee passbook & 80C certificate?");
    } else {
      setSpeech("👋 Move your cursor or drag me to rotate in 3D!");
    }
  }, [hoveredRole]);

  // Window-wide cursor tracking so robot constantly gazes at mouse pointer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Realistic 3D head and body gaze angles
      const maxTiltY = 28; // horizontal head turn degrees
      const maxTiltX = 20; // vertical nod degrees

      const rotY = Math.max(-maxTiltY, Math.min(maxTiltY, (deltaX / window.innerWidth) * (maxTiltY * 2.2)));
      const rotX = Math.max(-maxTiltX, Math.min(maxTiltX, -(deltaY / window.innerHeight) * (maxTiltX * 2.2)));

      setCursorRotation({ x: rotX, y: rotY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  // Interactive 3D Drag to Rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;

      setDragRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - dy * 0.4)),
        y: prev.y + dx * 0.5,
      }));

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  const totalRotX = isDragging ? dragRotation.x : cursorRotation.x;
  const totalRotY = isDragging ? dragRotation.y : cursorRotation.y;

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1200px" }}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic 3D Speech Bubble (Bright White Glass) */}
      <div
        className="mb-3 px-4 py-2.5 rounded-2xl bg-white/95 text-slate-900 border border-white/80 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl text-xs font-bold flex items-center gap-2 max-w-[290px] text-center transition-all duration-200 animate-in fade-in-0"
        style={{
          transform: `translate3d(${totalRotY * 0.35}px, ${totalRotX * 0.35}px, 25px)`,
        }}
      >
        <Sparkles className="size-4 text-primary shrink-0 animate-spin" style={{ animationDuration: "5s" }} />
        <span className="leading-snug">{speech}</span>
      </div>

      {/* 3D Interactive Mascot Model Container */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
          transition: isDragging ? "none" : "transform 0.12s ease-out",
          transformStyle: "preserve-3d",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="relative flex items-center justify-center group"
      >
        {/* Glowing 3D Volumetric Energy Aura */}
        <div
          className="absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-600/30 to-purple-600/20 blur-3xl opacity-85 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateZ(-35px)" }}
        />

        {/* Transparent 3D Robot Image (Isolated without checkerboard) */}
        <div className="relative z-10 w-64 sm:w-72 md:w-80 h-auto drop-shadow-[0_25px_40px_rgba(6,182,212,0.35)]">
          <img
            src="/finbot-transparent.png"
            alt="finBot 3D Robot Mascot"
            className="w-full h-auto object-contain transition-transform duration-200"
            draggable={false}
          />
        </div>

        {/* Floating 3D Holographic Pedestal / Ground Reflection */}
        <div
          className="absolute -bottom-7 w-52 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 blur-lg"
          style={{
            transform: `translateZ(-25px) scale(${1 - totalRotX * 0.01})`,
          }}
        />
      </div>

      {/* 3D Hint Badge (Bright White Glass) */}
      <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 border border-white/80 shadow-xl backdrop-blur-md text-[11px] font-bold">
        <Rotate3d className="size-3.5 text-primary animate-spin" style={{ animationDuration: "9s" }} />
        <span>Tracking Cursor · Drag to 3D Rotate</span>
      </div>
    </div>
  );
}

export default MascotRobot;
