"use client";

import React from 'react';

interface SelectionMenuProps {
  currentSuit: string;
  onSelect: (color: string) => void;
  onBack: () => void;
}

export const SelectionMenu = ({ currentSuit, onSelect, onBack }: SelectionMenuProps) => {
  const options = [
    { name: 'Classic Purple', color: '#6a0dad' },
    { name: 'Cyber Cyan', color: '#00ffff' },
    { name: 'Neon Red', color: '#ff0055' },
    { name: 'Street Gold', color: '#ffd700' },
  ];

  return (
    <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border-2 border-white/20 p-8 w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-500">
      <h2 className="text-cyan-400 text-xs tracking-widest uppercase mb-6 text-center">
        Select Outfit Type
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.name}
            onClick={() => onSelect(opt.color)}
            className={`p-4 border-2 transition-all text-[10px] uppercase font-bold tracking-tighter ${
              currentSuit === opt.color 
              ? 'border-white bg-white text-black' 
              : 'border-white/20 hover:border-white'
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="w-full mt-6 py-2 border border-pink-500/50 text-pink-500 text-[10px] uppercase hover:bg-pink-500 hover:text-white transition-colors"
      >
        Save & Return
      </button>
    </div>
  );
};