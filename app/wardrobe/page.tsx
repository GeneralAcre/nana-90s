"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';

const T = {
  deepPurple: '#4A043A',
  darkRed:    '#A10535',
  gold:       '#FAC335',
  brightRed:  '#DD192F',
  darkMauve:  '#482D40',
};

const characters = [
  {
    name:     'George',
    role:     'Arcade Mechanic',
    img:      '/characters/George.png',
    color:    '#DD192F',
    level:    12,
    age:      28,
    stars:    2,
    hometown: 'Bangkok',
    tag:      'HOT',
    tagColor: '#DD192F',
    charm:    4,
    dance:    6,
    hustle:   9,
    luck:     5,
    quote:    '"Reflexes forged in the fiery crucible of late-night competition. Fix it — or it will break you."',
  },
  {
    name:     'Lee',
    role:     'Street Photographer',
    img:      '/characters/Lee.png',
    color:    '#A10535',
    level:    22,
    age:      32,
    stars:    4,
    hometown: 'Chiang Mai',
    tag:      'HOT',
    tagColor: '#DD192F',
    charm:    6,
    dance:    4,
    hustle:   7,
    luck:     8,
    quote:    '"An eye sharper than any lens. He moves like a shadow and disappears before the flash fades."',
  },
  {
    name:     'Somchai',
    role:     'Muay Thai Fighter',
    img:      '/characters/Somchai.png',
    color:    '#C17F24',
    level:    15,
    age:      24,
    stars:    3,
    hometown: 'Korat',
    tag:      'FIERCE',
    tagColor: '#A10535',
    charm:    3,
    dance:    8,
    hustle:   10,
    luck:     4,
    quote:    '"Left the ring to fight for something real. He came for his brother and found a city full of lies."',
  },
  {
    name:     'Mazatada',
    role:     '??? Mystery ???',
    img:      '/characters/Mazatada.png',
    color:    '#4A043A',
    level:    18,
    age:      35,
    stars:    5,
    hometown: 'Pattaya',
    tag:      '?',
    tagColor: '#FAC335',
    charm:    8,
    dance:    3,
    hustle:   6,
    luck:     9,
    quote:    '"Knows every back-alley deal in the city. Keeps his friends close and his secrets closer."',
  },
];

const BAR_BLOCKS = 10;

/** Pixel block bar — fluid block size via clamp */
function PixelBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex" style={{ gap: 'clamp(1px, 0.2vw, 2px)' }}>
      {Array.from({ length: BAR_BLOCKS }).map((_, i) => (
        <div
          key={i}
          style={{
            width:      'clamp(9px, 1.1vw, 14px)',
            height:     'clamp(6px, 0.75vw, 9px)',
            background: i < value ? color : '#1a0010',
            border:     '1px solid #3a1028',
          }}
        />
      ))}
    </div>
  );
}

function SkillCell({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          fontSize:   'clamp(7px, 0.8vw, 10px)',
          color:      '#C080A0',
          width:      'clamp(38px, 4vw, 54px)',
          textAlign:  'right',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <PixelBar value={value} color={color} />
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span style={{ fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? T.gold : '#3a1028' }}>★</span>
      ))}
    </span>
  );
}

function SmallBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize:   'clamp(7px, 0.75vw, 10px)',
        padding:    'clamp(2px, 0.3vw, 4px) clamp(4px, 0.6vw, 8px)',
        background: '#1e0012',
        border:     `1px solid ${T.darkMauve}`,
        color:      '#C080A0',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

export default function WardrobePage() {
  const { setSuitColor } = useGame();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey,     setAnimKey]     = useState(0);

  const handleSelect = useCallback(
    (i: number) => {
      setActiveIndex(i);
      setAnimKey((k) => k + 1);
      setSuitColor(characters[i].color);
    },
    [setSuitColor],
  );

  const char = characters[activeIndex];

  return (
    <div
      className="relative h-dvh w-screen overflow-hidden select-none flex flex-col"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nana-plaza.png"
          alt="Nana Plaza"
          fill
          className="object-cover"
          style={{ imageRendering: 'pixelated' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(18,1,14,0.90)' }} />
        <div className="absolute inset-0 pointer-events-none scanlines" />
      </div>

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-6 pt-3 md:pt-4 pb-1 shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center font-black"
          style={{
            width:     'clamp(32px, 3.5vw, 40px)',
            height:    'clamp(32px, 3.5vw, 40px)',
            fontSize:  'clamp(10px, 1.2vw, 14px)',
            border:    `3px solid ${T.brightRed}`,
            background: '#1a0008',
            color:     '#FF6E6E',
            boxShadow: `0 0 10px ${T.brightRed}55`,
          }}
        >
          ✕
        </Link>

        <h1
          className="font-black uppercase tracking-widest"
          style={{
            fontSize:   'clamp(10px, 1.5vw, 18px)',
            color:      T.gold,
            textShadow: `0 0 10px ${T.gold}, 0 0 24px #FF8C00, 2px 2px 0 #5A2A00`,
          }}
        >
          SELECT CHARACTER
        </h1>

        <div style={{ width: 'clamp(32px, 3.5vw, 40px)' }} />
      </div>

      {/* ── MAIN AREA ── */}
      {/*
        Mobile  (<md): stacked — sprite 40% viewport height, info below
        Desktop (≥md): side by side — sprite 40vw, info 60vw
      */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row min-h-0">

        {/* ── SPRITE — 40% column, character naturally sized inside ── */}
        <div className="shrink-0 flex items-center justify-center w-full h-48 md:w-[40%] md:h-auto">
          <div
            key={animKey}
            className="relative"
            style={{
              width:     'clamp(120px, 18vw, 240px)',
              height:    'clamp(160px, 24vw, 320px)',
              animation: 'charEnter 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards, floatIdle 3.2s ease-in-out 0.45s infinite',
            }}
          >
            <Image
              src={char.img}
              alt={char.name}
              fill
              className="object-contain"
              style={{ imageRendering: 'pixelated' }}
              priority
            />
            {/* Ground shadow */}
            <div
              className="absolute bottom-0 left-1/2"
              style={{
                transform:  'translateX(-50%)',
                width:      '70%',
                height:     10,
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 75%)',
              }}
            />
          </div>
        </div>

        {/* ── INFO — 60% ── */}
        <div
          className="flex-1 flex flex-col justify-center overflow-y-auto
                     px-4 md:px-6 lg:px-10
                     py-3 md:py-4 lg:py-6
                     gap-2 md:gap-3 lg:gap-4"
        >
          {/* ✦ NAME ✦ */}
          <div className="flex items-center gap-2 md:gap-3">
            <span style={{ color: T.gold, fontSize: 'clamp(14px, 1.8vw, 22px)', lineHeight: 1 }}>✦</span>
            <h2
              className="font-black uppercase"
              style={{
                fontSize:   'clamp(22px, 3.5vw, 40px)',
                color:      T.gold,
                textShadow: `0 0 12px ${T.gold}, 0 0 28px #FF8C00, 3px 3px 0 #5A2A00`,
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              {char.name.toUpperCase()}
            </h2>
            <span style={{ color: T.gold, fontSize: 'clamp(14px, 1.8vw, 22px)', lineHeight: 1 }}>✦</span>
          </div>

          {/* · ROLE · HOMETOWN · */}
          <p
            className="uppercase tracking-widest"
            style={{
              fontSize:   'clamp(7px, 0.9vw, 11px)',
              color:      '#D060A0',
              letterSpacing: '0.18em',
              textShadow: `0 0 8px #A10535`,
            }}
          >
            · {char.role} · {char.hometown} ·
          </p>

          {/* Quote — hidden on very small screens */}
          <p
            className="hidden sm:block"
            style={{
              fontSize:    'clamp(9px, 1vw, 12px)',
              color:       '#C8A0C0',
              lineHeight:  1.85,
              fontFamily:  'sans-serif',
              fontStyle:   'italic',
              maxWidth:    560,
            }}
          >
            {char.quote}
          </p>

          {/* Badge row */}
          <div className="flex items-center gap-2 flex-wrap">
            <SmallBadge label={`LV.${char.level}`} />
            <Stars count={char.stars} />
            <SmallBadge label={char.hometown.toUpperCase()} />
            <SmallBadge label={`AGE ${char.age}`} />
            <span
              className="font-black"
              style={{
                fontSize:   'clamp(7px, 0.8vw, 10px)',
                padding:    'clamp(2px, 0.3vw, 4px) clamp(4px, 0.7vw, 9px)',
                background: char.tagColor,
                color:      char.tag === '?' ? '#1a0008' : '#fff',
                boxShadow:  `0 0 10px ${char.tagColor}99`,
                whiteSpace: 'nowrap',
              }}
            >
              {char.tag}
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              height:     2,
              background: `linear-gradient(90deg, ${T.darkMauve}, transparent)`,
              maxWidth:   540,
            }}
          />

          {/* Skill bars — 2×2 on md+, 1-col on mobile */}
          <div
            className="grid gap-y-2 md:gap-y-3"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 'clamp(4px, 1vw, 16px)' }}
          >
            <SkillCell label="CHARM"  value={char.charm}  color={T.brightRed} />
            <SkillCell label="DANCE"  value={char.dance}  color={T.darkRed}   />
            <SkillCell label="HUSTLE" value={char.hustle} color={T.gold}      />
            <SkillCell label="LUCK"   value={char.luck}   color="#C060A0"     />
          </div>
        </div>
      </div>

      {/* ── SELECTION STRIP ── */}
      <div
        className="relative z-10 shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-6"
        style={{
          height:     'clamp(100px, 14vh, 140px)',
          background: 'linear-gradient(180deg, rgba(10,0,8,0.94), rgba(5,0,4,0.99))',
          borderTop:  `2px solid ${T.darkMauve}`,
        }}
      >
        {/* Cards — scrollable on small screens */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 overflow-x-auto pb-1"
             style={{ scrollbarWidth: 'none' }}>
          {characters.map((c, i) => {
            const isActive = i === activeIndex;
            const cardW    = 'clamp(68px, 8vw, 100px)';
            const portH    = 'clamp(55px, 7.5vh, 84px)';
            return (
              <button
                key={c.name}
                onClick={() => handleSelect(i)}
                className="flex flex-col items-center transition-all duration-200 shrink-0"
                style={{
                  width:      cardW,
                  padding:    'clamp(3px, 0.4vw, 6px) clamp(3px, 0.4vw, 6px) clamp(4px, 0.5vw, 8px)',
                  background: isActive
                    ? 'linear-gradient(180deg, #2a0018, #180010)'
                    : 'linear-gradient(180deg, #140010, #0c0008)',
                  border:     `3px solid ${isActive ? T.gold : T.darkMauve}`,
                  boxShadow:  isActive ? `0 0 18px ${T.gold}55, 0 -3px 0 ${T.gold}` : 'none',
                  transform:  isActive ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
                }}
              >
                <div
                  className="relative w-full"
                  style={{
                    height:     portH,
                    background: '#080006',
                    border:     `1px solid ${isActive ? T.gold + '80' : T.darkMauve}`,
                  }}
                >
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-contain object-bottom"
                    style={{ imageRendering: 'pixelated', padding: '2px' }}
                  />
                </div>
                <span
                  className="mt-1 font-black uppercase leading-tight text-center block truncate w-full"
                  style={{
                    fontSize:   'clamp(6px, 0.65vw, 8px)',
                    color:      isActive ? T.gold : '#8A5070',
                    textShadow: isActive ? `0 0 6px ${T.gold}` : 'none',
                  }}
                >
                  {c.name.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        {/* START GAME */}
        <Link
          href="/game"
          className="font-black uppercase tracking-widest transition-all hover:brightness-110 active:translate-y-0.5 shrink-0"
          style={{
            fontSize:   'clamp(8px, 0.85vw, 11px)',
            padding:    'clamp(8px, 1.2vh, 14px) clamp(12px, 1.8vw, 24px)',
            background: `linear-gradient(180deg, ${T.deepPurple}, #100008)`,
            border:     '3px solid #C060FF',
            color:      '#E8B0FF',
            boxShadow:  '0 0 18px rgba(192,96,255,0.4), 3px 3px 0 #0a0010',
            textShadow: '0 0 8px #C060FF',
          }}
        >
          START GAME
        </Link>
      </div>

    </div>
  );
}
