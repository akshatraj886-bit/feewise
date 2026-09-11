"use client";

import React, { useEffect, useRef } from "react";

export function AnimatedMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle system
    const count = Math.min(Math.floor((width * height) / 18000), 70);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ["#5263e8", "#6366f1", "#8b5cf6", "#38bdf8", "#06b6d4"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        size: Math.random() * 2.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.25,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(82, 99, 232, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Connect to mouse cursor
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none bg-gradient-to-b from-[#f8faff] via-[#f1f4fd] to-[#edf2fc]">
      {/* Dynamic Animated Canvas with Interactive Particle Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-85" />

      {/* Floating Vibrant Aurora Blobs */}
      <div
        className="absolute -top-24 left-1/4 size-[600px] rounded-full bg-gradient-to-tr from-[#5263e8]/25 via-[#8b5cf6]/20 to-transparent blur-[110px] animate-pulse"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute top-1/3 -right-24 size-[550px] rounded-full bg-gradient-to-bl from-[#38bdf8]/25 via-[#5263e8]/15 to-transparent blur-[110px] animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-20 left-1/3 size-[580px] rounded-full bg-gradient-to-t from-[#6366f1]/20 via-[#06b6d4]/15 to-transparent blur-[120px] animate-pulse"
        style={{ animationDuration: "12s", animationDelay: "4s" }}
      />

      {/* Subtle 3D Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #5263e8 1.5px, transparent 1.5px), linear-gradient(to bottom, #5263e8 1.5px, transparent 1.5px)`,
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 90%)",
        }}
      />
    </div>
  );
}

export default AnimatedMeshBackground;
