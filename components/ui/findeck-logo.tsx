"use client";

import React from "react";

interface FinDeckLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg" | "xl";
  subtitle?: string;
}

export function FinDeckLogo({
  className = "",
  size = 36,
  showText = true,
  textSize = "md",
  subtitle,
}: FinDeckLogoProps) {
  const numericSize = typeof size === "number" ? size : parseInt(size) || 36;
  const iconHeight = numericSize;
  const iconWidth = Math.round(numericSize * (100 / 92));

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* FinDeck Icon adapted to website color theme */}
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 100 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105 drop-shadow-xs"
        aria-hidden="true"
      >
        <defs>
          {/* Primary Gradient tailored to website theme (#5263e8 to #6366f1) */}
          <linearGradient id="fd-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary, #5263e8)" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>

          {/* Secondary Layer Gradient */}
          <linearGradient id="fd-layer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="var(--primary, #5263e8)" />
          </linearGradient>

          {/* Shield Gradient */}
          <linearGradient id="fd-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="var(--primary, #5263e8)" />
          </linearGradient>

          {/* Glow / Shadow filter */}
          <filter id="fd-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5263e8" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Bottom Stack Layer */}
        <path
          d="M20 46 C20 43.5 22 42 24.5 41 L53 28 C55.5 27 58.5 27 61 28 L69 31.5 C69.5 32 69.5 33 68.5 33.5 L40.5 46 C38 47 35 47 32.5 46 L21 41 C20.5 40.8 20 41.5 20 42.5 L20 48 C20 50.5 22 52 24.5 53 L51 65 C53.5 66 56.5 66 59 65 L63 63 C63.8 62.6 64.5 63.5 64 64.2 L59 66.5 C56.5 67.8 53.5 67.8 51 66.5 L24.5 54.5 C21.8 53.2 20 50.5 20 47.5 Z"
          fill="url(#fd-primary-grad)"
          opacity="0.75"
        />

        {/* 2. Middle Stack Layer */}
        <path
          d="M20 34 C20 31.5 21.8 29.5 24.5 28.5 L51 16.5 C53.5 15.2 56.5 15.2 59 16.5 L67 20.2 C67.8 20.6 67.5 21.8 66.5 22.2 L41.5 33.5 C39 34.6 36 34.6 33.5 33.5 L23 28.8 C22.2 28.5 21.5 29.2 21.5 30 L21.5 35 C21.5 37.5 23.2 39.5 25.8 40.8 L51 52.5 C53.5 53.8 56.5 53.8 59 52.5 L63.5 50.2 C64.2 49.8 65 50.5 64.5 51.2 L59 54 C56.5 55.2 53.5 55.2 51 54 L24.5 42 C21.8 40.8 20 38 20 35 Z"
          fill="url(#fd-layer-grad)"
          opacity="0.9"
        />

        {/* 3. Top Stack Layer (Primary ledger card) */}
        <path
          d="M24.5 17.5 C22 16.2 22 13.8 24.5 12.5 L51 1.2 C53.5 -0.1 56.5 -0.1 59 1.2 L75.5 8.8 C78 10.1 78 12.5 75.5 13.8 L49 25 C46.5 26.2 43.5 26.2 41 25 Z"
          fill="url(#fd-primary-grad)"
          filter="url(#fd-glow)"
        />

        {/* 3 Horizontal Slits / Data stripes on top card */}
        <rect
          x="35"
          y="7"
          width="13"
          height="2.8"
          rx="1.4"
          transform="rotate(24 35 7)"
          fill="#ffffff"
          opacity="0.95"
        />
        <rect
          x="41"
          y="10"
          width="13"
          height="2.8"
          rx="1.4"
          transform="rotate(24 41 10)"
          fill="#ffffff"
          opacity="0.95"
        />
        <rect
          x="47"
          y="13"
          width="13"
          height="2.8"
          rx="1.4"
          transform="rotate(24 47 13)"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* 4. Security Shield (Foreground element with checkmark) */}
        <g filter="url(#fd-glow)">
          {/* Shield Body */}
          <path
            d="M57 32 C66 32 75 27 75 27 C75 27 84 32 93 32 C93 49 84 62 75 67 C66 62 57 49 57 32 Z"
            fill="url(#fd-shield-grad)"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Shield Checkmark */}
          <path
            d="M68 47 L73 52 L83 40"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Typography: "finDeck" matching the uploaded logo styling */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span
              className={`font-black tracking-tight text-foreground ${
                textSize === "sm"
                  ? "text-base"
                  : textSize === "lg"
                  ? "text-2xl"
                  : textSize === "xl"
                  ? "text-3xl"
                  : "text-lg"
              }`}
            >
              fin<span className="text-primary font-black">Deck</span>
            </span>
          </div>
          {subtitle && (
            <span className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase max-w-[420px] truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default FinDeckLogo;
