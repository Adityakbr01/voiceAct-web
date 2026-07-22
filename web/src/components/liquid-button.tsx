"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import { cn } from "@/lib/utils";

type MeshProps = ThreeElements["mesh"];

interface LiquidBlobProps {
  color?: string;
  followPointer?: boolean;
}

function LiquidBlob({ color = "#ffffff", followPointer = true }: LiquidBlobProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const { pointer, camera } = state;
    const v = (state.viewport as any).getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    const targetScale = hovered ? 1.15 : 1;
    easing.damp(ref.current.scale, "x", targetScale, 0.2, delta);
    easing.damp(ref.current.scale, "y", targetScale, 0.2, delta);
    easing.damp(ref.current.scale, "z", targetScale, 0.2, delta);

    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh
      ref={ref}
      scale={0.15}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        ior={1.15}
        thickness={5}
        anisotropy={0.01}
        chromaticAberration={0.1}
        transmission={1}
        roughness={0}
        color={color}
      />
    </mesh>
  );
}

function Scene({ color, followPointer }: LiquidBlobProps) {
  return (
    <>
      <LiquidBlob color={color} followPointer={followPointer} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
}

export interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: string;
  followPointer?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const sizeClasses = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variantClasses = {
  default: "text-white font-semibold",
  outline: "text-white font-semibold border border-white/30",
  ghost: "text-white font-medium",
};

export function LiquidButton({
  children,
  onClick,
  className,
  variant = "default",
  size = "md",
  color,
  followPointer = true,
  disabled = false,
  type = "button",
}: LiquidButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = useCallback(() => setPressed(true), []);
  const handlePointerUp = useCallback(() => setPressed(false), []);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer transition-transform duration-200",
        sizeClasses[size],
        variantClasses[variant],
        pressed && "scale-95",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 15 }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
          style={{ pointerEvents: "none" }}
        >
          <Scene color={color} followPointer={followPointer} />
        </Canvas>
      </div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default LiquidButton;
