"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useGame } from '../context/GameContext';

const characters = [
  {
    name: 'George',
    color: '#DD192F',
    img: '/characters/George.png',
    age: 28,
    occupation: 'Arcade Mechanic',
    hometown: 'Bangkok',
    skills: 'High-Speed Reflexes, Electronics Master',
    story:
      "A skilled arcade mechanic whose reflexes were forged in the fiery crucible of late-night competition. He's on a mission to uncover the truth behind a glitch in the city's power grid. His mantra: \"Fix it, or it will break you.\"",
  },
  {
    name: 'Lee',
    color: '#A10535',
    img: '/characters/Lee.png',
    age: 32,
    occupation: 'Street Photographer',
    hometown: 'Chiang Mai',
    skills: 'Sharp Eye, Shadow Movement',
    story:
      "A wandering photographer with an eye sharper than any lens. Lee drifts through neon-lit alleys capturing secrets nobody else dares to see. He moves like a shadow and disappears before the flash fades.",
  },
  {
    name: 'Mazatada',
    color: '#4A043A',
    img: '/characters/Mazatada.png',
    age: 35,
    occupation: 'Underground Trader',
    hometown: 'Pattaya',
    skills: 'Negotiation, Black Market Intel',
    story:
      "An underground trader who knows every back-alley deal in the city. Mazatada has survived by keeping his friends close and his secrets closer. Nobody crosses him twice.",
  },
  {
    name: 'Somchai',
    color: '#C17F24',
    img: '/characters/Somchai.png',
    age: 24,
    occupation: 'Muay Thai Fighter',
    hometown: 'Korat',
    skills: 'Iron Fists, Street Instinct',
    story:
      "A rising Muay Thai fighter who left the ring to fight for something real. Somchai came to the plaza looking for his missing brother and found a city full of lies. He hits first and asks questions later.",
  },
];

export default function WardrobePage() {
  const { suitColor, setSuitColor } = useGame();

  const selectedIndex = characters.findIndex((c) => c.color === suitColor);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const character = characters[activeIndex];

  const prev = () => {
    const i = (activeIndex - 1 + characters.length) % characters.length;
    setSuitColor(characters[i].color);
  };
  const next = () => {
    const i = (activeIndex + 1) % characters.length;
    setSuitColor(characters[i].color);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none flex flex-col"
      style={{ fontFamily: "'Press Start 2P', 'Courier New', monospace" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nana-plaza.png"
          alt="Nana Plaza"
          fill
          className="object-cover pixelated"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-center pt-5 px-6">
        {/* X Button */}
        <Link
          href="/"
          className="absolute left-6 top-5 w-10 h-10 flex items-center justify-center border-2 border-red-500 bg-red-800/80 text-red-300 font-black text-lg hover:bg-red-600 transition-colors"
          style={{ imageRendering: 'pixelated' }}
        >
          ✕
        </Link>

        {/* Neon Title */}
        <h1
          className="text-4xl md:text-5xl font-black tracking-widest uppercase text-center"
          style={{
            color: '#FFE44D',
            textShadow:
              '0 0 8px #FFE44D, 0 0 20px #FFB800, 0 0 40px #FF8C00, 2px 2px 0 #7A3A00',
            letterSpacing: '0.15em',
          }}
        >
          NANA PLAZA
        </h1>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-8 px-8 py-4">

        {/* LEFT — Portrait Frame */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          {/* Outer border frame */}
          <div
            className="relative p-2"
            style={{
              border: '4px solid #8B6914',
              boxShadow: '0 0 0 2px #4A2E00, inset 0 0 0 2px #4A2E00, 0 4px 20px rgba(0,0,0,0.8)',
              background: 'linear-gradient(145deg, #5C3A00, #3A2000)',
            }}
          >
            <div
              className="relative"
              style={{
                border: '3px solid #FFE44D',
                boxShadow: '0 0 12px rgba(255,228,77,0.4), inset 0 0 8px rgba(0,0,0,0.6)',
              }}
            >
              <div className="relative w-52 h-64 bg-[#1a0a2e]">
                <Image
                  src={character.img}
                  alt={character.name}
                  fill
                  className="object-contain pixelated"
                  priority
                />
              </div>
            </div>
          </div>

          {/* READY badge */}
          <div
            className="px-8 py-2 text-sm font-black tracking-widest"
            style={{
              background: 'linear-gradient(180deg, #1a4a1a, #0d2e0d)',
              border: '3px solid #4CAF50',
              color: '#6FE87A',
              boxShadow: '0 0 10px rgba(76,175,80,0.5)',
              textShadow: '0 0 6px #4CAF50',
            }}
          >
            READY
          </div>
        </div>

        {/* RIGHT — Info Panel */}
        <div
          className="flex flex-col gap-3 w-full max-w-sm"
          style={{
            background: 'linear-gradient(160deg, rgba(20,5,40,0.95), rgba(10,2,25,0.97))',
            border: '3px solid #8B4B8B',
            boxShadow: '0 0 20px rgba(139,75,139,0.4), inset 0 0 30px rgba(0,0,0,0.5)',
            padding: '20px',
          }}
        >
          {/* Character Name */}
          <h2
            className="text-3xl font-black uppercase tracking-wider"
            style={{
              color: '#FFE44D',
              textShadow: '0 0 8px #FFB800, 2px 2px 0 #7A3A00',
            }}
          >
            {character.name.toUpperCase()}
          </h2>

          {/* Status */}
          <div className="space-y-1 text-xs" style={{ color: '#E0C8FF' }}>
            <p style={{ color: '#FF9EFF' }}>◆ SELECTING PLAYER...</p>
            <p>👤 NAME: <span style={{ color: '#FFE44D' }}>{character.name.toUpperCase()}</span></p>
            <p>✔ STATUS: <span style={{ color: '#6FE87A' }}>READY</span></p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '2px solid #8B4B8B', opacity: 0.6 }} />

          {/* Details */}
          <div className="space-y-1 text-xs" style={{ color: '#E0C8FF' }}>
            <p
              className="text-sm font-black tracking-widest mb-2"
              style={{ color: '#FF9EFF', textShadow: '0 0 6px #FF6EFF' }}
            >
              DETAILS
            </p>
            <p>📅 AGE: <span style={{ color: '#FFE44D' }}>{character.age}</span></p>
            <p>⚙ OCCUPATION: <span style={{ color: '#FFE44D' }}>{character.occupation.toUpperCase()}</span></p>
            <p>📍 HOMETOWN: <span style={{ color: '#FFE44D' }}>{character.hometown.toUpperCase()}</span></p>
            <p>⚡ SKILLS: <span style={{ color: '#FFE44D' }}>{character.skills.toUpperCase()}</span></p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '2px solid #8B4B8B', opacity: 0.6 }} />

          {/* Story */}
          <div className="space-y-2">
            <p
              className="text-sm font-black tracking-widest"
              style={{ color: '#FF9EFF', textShadow: '0 0 6px #FF6EFF' }}
            >
              STORY
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: '#C8A8E0', fontFamily: 'sans-serif', fontSize: '11px' }}
            >
              {character.story}
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 flex items-end justify-between px-8 pb-6">

        {/* Character Selector */}
        <div className="flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="text-white text-xl font-black hover:text-yellow-300 transition-colors px-1"
            style={{ textShadow: '0 0 6px #FFE44D' }}
          >
            ◀
          </button>

          {characters.map((c, i) => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <button
                onClick={() => setSuitColor(c.color)}
                className="relative overflow-hidden transition-all duration-150"
                style={{
                  width: '64px',
                  height: '64px',
                  border: i === activeIndex ? '3px solid #FFE44D' : '3px solid #555',
                  boxShadow: i === activeIndex ? '0 0 14px rgba(255,228,77,0.7)' : 'none',
                  transform: i === activeIndex ? 'scale(1.12)' : 'scale(1)',
                  background: c.color,
                  opacity: i === activeIndex ? 1 : 0.55,
                }}
              >
                <Image src={c.img} alt={c.name} fill className="object-cover scale-125 pixelated" />
              </button>
              <span
                className="text-xs font-black uppercase tracking-widest"
                style={{
                  color: i === activeIndex ? '#FFE44D' : '#888',
                  textShadow: i === activeIndex ? '0 0 6px #FFB800' : 'none',
                  fontSize: '9px',
                }}
              >
                {c.name.toUpperCase()}
              </span>
            </div>
          ))}

          {/* Right arrow */}
          <button
            onClick={next}
            className="text-white text-xl font-black hover:text-yellow-300 transition-colors px-1"
            style={{ textShadow: '0 0 6px #FFE44D' }}
          >
            ▶
          </button>
        </div>

        {/* START GAME button */}
        <Link
          href="/game"
          className="px-8 py-3 text-base font-black uppercase tracking-widest transition-all hover:brightness-110 active:translate-y-0.5"
          style={{
            background: 'linear-gradient(180deg, #2a1a4a, #1a0a32)',
            border: '4px solid #C060FF',
            color: '#E8B0FF',
            boxShadow: '0 0 16px rgba(192,96,255,0.5), 4px 4px 0 #0a0018',
            textShadow: '0 0 8px #C060FF',
          }}
        >
          START GAME
        </Link>
      </div>

      <style jsx global>{`
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
