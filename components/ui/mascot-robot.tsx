"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sparkles, Rotate3d, Loader2, RefreshCw } from "lucide-react";

interface MascotRobotProps {
  className?: string;
  hoveredRole?: string | null;
}

export function MascotRobot({ className = "", hoveredRole }: MascotRobotProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [speech, setSpeech] = useState<string>("👋 Hi! I'm finBot. Move your cursor and I'll look right at you!");

  // Speech bubble reactivity
  useEffect(() => {
    if (hoveredRole === "admin") {
      setSpeech("👑 Welcome CEO Ramamurthy! Executive command center ready.");
    } else if (hoveredRole === "finance-officer") {
      setSpeech("💼 Welcome Comptroller Priya! Ready to audit ledger discrepancies.");
    } else if (hoveredRole === "student") {
      setSpeech("🎓 Hi Akshat! Ready to view fee passbook & 80C certificate?");
    } else {
      setSpeech("👋 Move your cursor or drag to spin me in full 3D!");
    }
  }, [hoveredRole]);

  // Target and current rotation refs for 60fps animation loop
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const isDraggingRef = useRef(false);
  const dragReleaseTimer = useRef<NodeJS.Timeout | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 440;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Remove any leftover canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (warm-white highlight from top front-right)
    const keyLight = new THREE.DirectionalLight(0xf1f5f9, 2.4);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    // Fill Light (soft cool blue from left)
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // Rim light from rear (indigo/purple to blend into dark veil)
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Cyan Eye & Chest Emissive Booster Point Light
    const cyanPointLight = new THREE.PointLight(0x06b6d4, 3.2, 8);
    cyanPointLight.position.set(0, 1.5, 2.2);
    scene.add(cyanPointLight);

    // Group wrapper for easy centering, tilting, and floating
    const companionRoot = new THREE.Group();
    scene.add(companionRoot);

    // --- Load the 3D GLB Model ---
    const loader = new GLTFLoader();
    let companionModel: THREE.Object3D | null = null;

    loader.load(
      "/models/ai-companion.glb",
      (gltf) => {
        const model = gltf.scene;
        companionModel = model;

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) {
              // Enhance cyan emissive parts (eyes, smile)
              if (mat.name === "light" || mat.emissive?.r > 0 || mat.emissive?.g > 0 || mat.emissive?.b > 0) {
                mat.emissive = new THREE.Color(0x00f0ff);
                mat.emissiveIntensity = 2.8;
              } else if (mat.name === "visor") {
                // Shiny curved obsidian face visor
                mat.roughness = 0.08;
                mat.metalness = 0.85;
              } else if (mat.name === "shell") {
                // Sleek pearl finish
                mat.roughness = 0.22;
                mat.metalness = 0.15;
              }
            }
          }
        });

        // Compute Bounding Box to center precisely
        const bbox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        const size = new THREE.Vector3();
        bbox.getSize(size);

        // Center model so its torso & head are directly in the focal zone
        model.position.x = -center.x;
        model.position.y = -center.y - 0.25; // slightly lower so base is anchored
        model.position.z = -center.z;

        companionRoot.add(model);
        setIsLoading(false);
      },
      (progressEvent) => {
        if (progressEvent.total > 0) {
          const pct = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setLoadProgress(pct);
        }
      },
      (error) => {
        console.error("Error loading GLB AI companion model:", error);
        setIsLoading(false);
      }
    );

    // --- Window-wide Mouse Move Gaze Tracking ---
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from screen center to mouse
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate yaw and pitch in radians
      // Yaw: horizontal turning towards mouse (max ~50 degrees)
      const maxAngleY = THREE.MathUtils.degToRad(48);
      // Pitch: vertical nodding towards mouse (max ~22 degrees)
      const maxAngleX = THREE.MathUtils.degToRad(20);

      const normX = deltaX / (window.innerWidth / 2);
      const normY = deltaY / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      targetRotation.current = {
        y: clampedX * maxAngleY,
        x: clampedY * maxAngleX,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Damping towards target rotation
      const lerpFactor = isDraggingRef.current ? 0.25 : 0.07;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor;

      // Apply rotation to companion root
      companionRoot.rotation.y = currentRotation.current.y + dragOffset.current.y;
      companionRoot.rotation.x = currentRotation.current.x + dragOffset.current.x;

      // Gentle floating / idle breathing oscillation
      const floatY = Math.sin(elapsedTime * 2.2) * 0.07;
      const tiltZ = Math.cos(elapsedTime * 1.5) * 0.015;
      companionRoot.position.y = floatY;
      companionRoot.rotation.z = tiltZ;

      // Subtle pulsing of eye light
      cyanPointLight.intensity = 3.0 + Math.sin(elapsedTime * 3) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Mouse / Touch Drag to 3D Orbit ---
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (dragReleaseTimer.current) clearTimeout(dragReleaseTimer.current);
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStart.current = {
      x: clientX,
      y: clientY,
      rotX: dragOffset.current.x,
      rotY: dragOffset.current.y,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handlePointerDown(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;

      dragOffset.current = {
        y: dragStart.current.rotY + dx * 0.012,
        x: Math.max(-0.6, Math.min(0.6, dragStart.current.rotX + dy * 0.01)),
      };
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);

        // After releasing, slowly ease drag offset back to 0 so mouse cursor tracking resumes
        dragReleaseTimer.current = setTimeout(() => {
          const resetInterval = setInterval(() => {
            dragOffset.current.x *= 0.88;
            dragOffset.current.y *= 0.88;
            if (
              Math.abs(dragOffset.current.x) < 0.01 &&
              Math.abs(dragOffset.current.y) < 0.01
            ) {
              dragOffset.current.x = 0;
              dragOffset.current.y = 0;
              clearInterval(resetInterval);
            }
          }, 16);
        }, 1500);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleEnd);
      if (dragReleaseTimer.current) clearTimeout(dragReleaseTimer.current);
    };
  }, []);

  const handleResetAngle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragOffset.current = { x: 0, y: 0 };
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Dynamic 3D Speech Bubble (Bright White Glass) */}
      <div className="mb-2 px-4 py-2.5 rounded-2xl bg-white/95 text-slate-900 border border-white/90 shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl text-xs font-bold flex items-center gap-2 max-w-[310px] text-center transition-all duration-200 animate-in fade-in-0">
        <Sparkles className="size-4 text-primary shrink-0 animate-spin" style={{ animationDuration: "6s" }} />
        <span className="leading-snug">{speech}</span>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className="relative w-[320px] sm:w-[360px] md:w-[410px] h-[380px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing group touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Glowing 3D Energy Aura behind robot */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-600/25 to-purple-600/20 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full relative z-10" />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl gap-3">
            <Loader2 className="size-8 text-cyan-400 animate-spin" />
            <div className="text-xs font-bold text-cyan-200">
              Loading 3D AI Companion... {loadProgress > 0 ? `${loadProgress}%` : ""}
            </div>
          </div>
        )}

        {/* Holographic Pedestal / Ground Shadow Reflection */}
        <div className="absolute bottom-3 w-56 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/35 to-purple-500/30 blur-md pointer-events-none" />
      </div>

      {/* 3D Control Hint Badge */}
      <div className="mt-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 border border-white/80 shadow-xl backdrop-blur-md text-[11px] font-bold">
        <Rotate3d className="size-3.5 text-primary animate-spin" style={{ animationDuration: "10s" }} />
        <span>Tracking Cursor · Drag 360° to Rotate</span>
        {(dragOffset.current.x !== 0 || dragOffset.current.y !== 0) && (
          <button
            onClick={handleResetAngle}
            title="Reset angle to face cursor"
            className="ml-1 p-0.5 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
          >
            <RefreshCw className="size-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MascotRobot;
