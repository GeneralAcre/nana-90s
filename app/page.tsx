"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-12">
      {/* Header */}
      <div className="border-l-4 border-cyan-400 pl-4">
        <span className="text-cyan-400 text-[10px] tracking-[0.5em] uppercase">Sector_Nana</span>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">1UP 2026</h1>
      </div>

      {/* Center Button */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <Link 
          href="/wardrobe" 
          className="group pointer-events-auto border-2 border-white px-10 py-3 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          <span className="text-lg font-black tracking-[0.4em] uppercase">Insert Coin</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end opacity-60 text-[10px] tracking-widest uppercase">
        <p>System: Online</p>
        <p>Loc: BKK_SOI_4</p>
      </div>
    </div>
  );
}