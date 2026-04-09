"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. The Procedural Pixel Character ---
const PixelJoker = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    // Floating in the lower third of the screen
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15 - 5; 
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.7}>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.4]} />
        <meshStandardMaterial color="#22bb22" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.35]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 1.0, 0.3]} />
        <meshStandardMaterial color="#6a0dad" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.18]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[-0.15, 1.6, 0.18]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <pointLight intensity={40} color="#ff00ff" distance={8} />
    </group>
  );
};

// --- 2. The District Block ---
const DistrictBlock = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.5 + 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, -3.5, 0]}>
      <boxGeometry args={[20, 4, 30]} /> 
      <meshStandardMaterial 
        color="#050505" 
        emissive="#ff0055" 
        emissiveIntensity={1} 
        roughness={0.1}
      />
    </mesh>
  );
};

// --- 3. The Main Landing Page ---
export default function NanaLanding() {
  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden select-none font-mono">
      
      {/* LAYER 1: Full Page Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/nana-plaza.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60 brightness-75"
          style={{ imageRendering: 'pixelated' }}
        />
        {/* Dark vignette to make the UI pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      {/* LAYER 2: 3D Scene */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <OrthographicCamera makeDefault zoom={40} position={[20, 20, 20]} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={5000} color="#00ffff" />
          
          <Stars radius={100} count={2000} factor={4} fade speed={0.5} />
          <Sparkles count={40} scale={20} size={3} speed={0.3} color="#ff0055" />

          <DistrictBlock />
          <PixelJoker />
          
          <gridHelper args={[100, 50, '#111', '#050505']} position={[0, -5.5, 0]} />
        </Canvas>
      </div>

      {/* LAYER 3: Interactive UI */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
        
        {/* Header HUD */}
        <div className="flex justify-between items-start pointer-events-none">
          <div className="border-l-4 border-cyan-400 pl-4">
            <span className="text-cyan-400 text-[10px] tracking-[0.5em] uppercase">Sector_Nana</span>
            <h1 className="text-white text-3xl font-black italic tracking-tighter">1UP 2026</h1>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-6 border-2 border-pink-500 bg-pink-500/20 animate-pulse" />
            <div className="hidden md:block text-pink-500 font-black text-xs tracking-widest mt-1">
              LIVE_SIGNAL
            </div>
          </div>
        </div>

        {/* Bottom Section (Button and Footer) */}
        <div className="flex flex-col items-center gap-10">
          
          {/* Central Interaction - Moved to bottom */}
          <button className="group relative pointer-events-auto border-4 border-white px-10 py-4 md:px-16 md:py-8 bg-black/40 backdrop-blur-md hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-95">
            <span className="relative z-10 text-xl md:text-5xl font-black tracking-[0.4em] uppercase text-white group-hover:text-black">
              Insert Coin
            </span>
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Footer HUD */}
          <div className="w-full flex justify-between items-end pointer-events-none">
            <div className="text-cyan-400 text-[10px] opacity-60 uppercase tracking-widest leading-relaxed">
              <p>System: Online</p>
              <p>Env: Isometric_Grid</p>
              <p className="hidden md:block">Loc: BKK_SOI_4</p>
            </div>
            <div className="text-pink-500 font-black text-2xl drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
              LIFE x 01
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: CRT Scanline Filter */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-[length:100%_4px,3px_100%]" />
      
    </main>
  );
}