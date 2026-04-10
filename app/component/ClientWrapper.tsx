"use client";

import { GameProvider } from "../context/GameContext";
import dynamic from "next/dynamic";

// Changed "../components/..." to "../component/..." to match your folder name
const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      {/* 3D World stays in background */}
      <BackgroundScene />
      
      {/* UI Pages (Landing / Wardrobe) */}
      <div className="relative z-20 w-screen h-screen pointer-events-none">
        {children}
      </div>
      
      {/* CRT Filter */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-size-[100%_4px,3px_100%]" 
      />
    </GameProvider>
  );
}