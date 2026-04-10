"use client";
import Link from 'next/link';
import { useGame } from '../context/GameContext';

export default function WardrobePage() {
  const { suitColor, setSuitColor } = useGame();
  
  const options = [
    { name: 'Classic Purple', color: '#6a0dad' },
    { name: 'Cyber Cyan', color: '#00ffff' },
    { name: 'Neon Red', color: '#ff0055' },
    { name: 'Street Gold', color: '#ffd700' },
  ];

  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-12 animate-in fade-in duration-500">
      <div className="border-l-4 border-pink-500 pl-4 pointer-events-none">
        <span className="text-pink-500 text-[10px] tracking-[0.5em] uppercase">System_Config</span>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">Wardrobe</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border-2 border-white/20 p-8 w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt) => (
              <button
                key={opt.name}
                onClick={() => setSuitColor(opt.color)}
                className={`p-4 border-2 transition-all text-[10px] font-bold uppercase ${suitColor === opt.color ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
          <Link href="/" className="block w-full mt-6 py-2 text-center border border-white hover:bg-white hover:text-black transition-all text-[10px] uppercase font-bold">
            Confirm & Exit
          </Link>
        </div>
      </div>
    </div>
  );
}