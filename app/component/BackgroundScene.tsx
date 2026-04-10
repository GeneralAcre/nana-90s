"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../context/GameContext';
import { usePathname } from 'next/navigation';

export default function BackgroundScene() {
  const { suitColor } = useGame();
  const pathname = usePathname();
  const isWardrobe = pathname === '/wardrobe';

  return (
    <div className="fixed inset-0 z-0">
      {/* Background Image */}
      <img 
        src="/nana-plaza.png" 
        className={`w-full h-full object-cover transition-all duration-1000 ${isWardrobe ? 'opacity-20 blur-md' : 'opacity-60'}`}
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/90" />

      {/* 3D Scene */}
      <Canvas dpr={[1, 2]} className="absolute inset-0">
        <OrthographicCamera makeDefault zoom={isWardrobe ? 60 : 40} position={[20, 20, 20]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={5000} color={suitColor} />
        <Stars radius={100} count={2000} factor={4} fade speed={0.5} />
        <Sparkles count={40} scale={20} size={3} speed={0.3} color={suitColor} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
           <PixelCharacter color={suitColor} y={isWardrobe ? -1 : -5} scale={isWardrobe ? 1.2 : 0.7} />
        </Float>
        <gridHelper args={[100, 50, '#111', '#050505']} position={[0, -5.5, 0]} />
      </Canvas>
    </div>
  );
}

function PixelCharacter({ color, y, scale }: { color: string, y: number, scale: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15 + y;
  });
  return (
    <group ref={ref} scale={scale}>
      <mesh position={[0, 1.8, 0]}><boxGeometry args={[0.7, 0.3, 0.4]} /><meshStandardMaterial color="#22bb22" /></mesh>
      <mesh position={[0, 1.5, 0]}><boxGeometry args={[0.6, 0.6, 0.35]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[0, 0.7, 0]}><boxGeometry args={[0.8, 1.0, 0.3]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0.15, 1.6, 0.18]}><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="red" /></mesh>
      <mesh position={[-0.15, 1.6, 0.18]}><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="red" /></mesh>
    </group>
  );
}