"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useGame } from '../context/GameContext';

export default function WardrobePage() {
  const { suitColor, setSuitColor } = useGame();
  
  const options = [
    { name: 'George', color: '#DD192F', img: '/characters/george.png' },
    { name: 'Lee', color: '#A10535', img: '/characters/lee.png' },
    { name: 'Mazatada', color: '#4A043A', img: '/characters/mazatada.png' },
    { name: 'Somchai', color: '#FAC335', img: '/characters/somchai.png' },
  ];

  const selectedCharacter = options.find(opt => opt.color === suitColor) || options[0];

  return (
    <div className="relative h-screen w-screen p-8 flex flex-col justify-between select-none">
      
      {/* Top Navigation */}
      <div className="z-30">
        <Link href="/" className="pointer-events-auto inline-block hover:scale-110 transition-transform">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Link>
      </div>

      {/* --- SCALE & PLACEMENT CHANGES ARE HERE --- */}
      {/* This is the new "Center Section". 
        It is full width and spans from left edge to right edge. 
        `justify-between` forces the children into their respective 50% slots.
      */}
      <div className="flex flex-1 items-center justify-between w-full mx-auto px-16 -mt-10">
        
        {/*
          Left Box (Character Placement)
          `w-1/2` (w-50%) takes up the entire left half of the screen.
          `flex justify-center` centers the small original portrait image inside this half-screen area.
        */}
        <div className="w-1/2 flex justify-center items-center">
           {/* This inner container holds the portrait at its original scale */}
           <div className="relative w-64 h-80 transition-all duration-300 transform">
              <Image 
                src={selectedCharacter.img} 
                alt={selectedCharacter.name}
                fill
                className="object-contain pixelated"
                priority
              />
           </div>
        </div>

        {/*
          Right Box (Info Box Placement)
          `w-1/2` (w-50%) aligns the start of the purple box to the exact middle of the screen.
          `pl-16` provides consistent spacing from the middle, matching the image.
        */}
        <div className="w-1/2 pl-16 flex justify-start items-center">
          {/* This is the scaled-up purple box.
            Increased padding (`p-10`) and height (`min-h-[400px]`) make it a larger focal point.
          */}
          <div className="w-full max-w-xl bg-[#4A043A] rounded-2xl p-10 shadow-xl min-h-[400px] flex flex-col justify-center border border-white/10">
            <h1 className="text-white text-5xl font-bold mb-6 uppercase italic tracking-tighter">
              {selectedCharacter.name}
            </h1>
            <div className="text-white/90 space-y-6 font-mono text-xl leading-snug">
              <p>SELECTING PLAYER...</p>
              <p>NAME: {selectedCharacter.name.toUpperCase()}</p>
              <p>STATUS: READY</p>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------- */}

      {/* Bottom Section */}
      <div className="z-30 flex items-end justify-between w-full max-w-6xl mx-auto pb-4 px-16">
        
        {/* Character Selection Buttons */}
        <div className="flex gap-4 pointer-events-auto">
          {options.map((opt) => (
            <div key={opt.name} className="flex flex-col items-center gap-2">
              <button
                onClick={() => setSuitColor(opt.color)}
                className={`w-20 h-20 transition-all transform border-2 relative overflow-hidden ${
                  suitColor === opt.color ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'border-transparent opacity-60'
                }`}
                style={{ backgroundColor: opt.color }}
              >
                <Image src={opt.img} alt={opt.name} fill className="object-cover scale-125" />
              </button>
              <span className={`text-xs font-bold uppercase tracking-widest ${suitColor === opt.color ? 'text-white' : 'text-white/40'}`}>
                {opt.name}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pointer-events-auto">
          <Link 
            href="/game" 
            className="bg-[#d9d9d9] text-black px-12 py-4 text-2xl font-black uppercase hover:bg-white transition-all active:translate-y-1 shadow-[4px_4px_0px_#000]"
          >
            Start Game
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
}