"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FabricRippleCanvasProps {
  className?: string;
  intensity?: number;
  speed?: number;
  mode?: "splash" | "footer";
}

export const FabricRippleCanvas: React.FC<FabricRippleCanvasProps> = ({
  className = "",
  intensity = 0.35,
  speed = 0.8,
  mode = "splash",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      setWebGlSupported(false);
      return;
    }

    // Mobile fallback to lightweight CSS
    if (window.innerWidth < 768) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    // GLSL Silk cloth shader with noise ripple
    const vertexShader = `
      uniform float uTime;
      uniform float uIntensity;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Silk fold waves
        float wave1 = sin(pos.x * 2.5 + uTime * 0.8) * cos(pos.y * 2.0 + uTime * 0.6);
        float wave2 = sin(pos.y * 3.5 - uTime * 0.5) * 0.5;
        float wave3 = sin((pos.x + pos.y) * 4.0 + uTime * 1.2) * 0.25;

        float elevation = (wave1 + wave2 + wave3) * uIntensity;
        pos.z += elevation;
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uColorDeep;
      uniform vec3 uColorTeal;
      uniform vec3 uColorGold;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vec3 color = mix(uColorDeep, uColorTeal, vElevation * 2.0 + 0.4);
        float goldHighlight = smoothstep(0.18, 0.45, vElevation);
        color = mix(color, uColorGold, goldHighlight * 0.65);
        gl_FragColor = vec4(color, 0.92);
      }
    `;

    const isFooter = mode === "footer";
    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uColorDeep: { value: new THREE.Color("#062C30") },
      uColorTeal: { value: new THREE.Color(isFooter ? "#0A4A4C" : "#1F8A86") },
      uColorGold: { value: new THREE.Color("#E8A317") },
    };

    const geometry = new THREE.PlaneGeometry(4, 3, 36, 36);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    // Pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime * speed;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [intensity, speed, mode, prefersReducedMotion]);

  if (!webGlSupported || prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-ink via-teal-deep/50 to-ink opacity-80 ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};
