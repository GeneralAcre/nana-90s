"use client";
import { use, useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "../../context/GameContext";
import { storeNPCs, NPC } from "../npcData";
import { useGameAudio } from "./useGameAudio";

const storeMeta: Record<string, { label: string; color: string; glow: string }> = {
  playboy:   { label: "PLAYBOY",       color: "#FF69B4", glow: "#FF1493" },
  obsession: { label: "OBSESSION",     color: "#9B59B6", glow: "#8E44AD" },
  spectrum:  { label: "SPECTRUM",      color: "#00BFFF", glow: "#0080FF" },
  dollhouse: { label: "THE DOLLHOUSE", color: "#FF4500", glow: "#FF6347" },
  candybar:  { label: "CANDY BAR",     color: "#FFD700", glow: "#FFA500" },
  rainbow:   { label: "RAINBOW",       color: "#7FFF00", glow: "#32CD32" },
};

const playerChars: Record<string, string> = {
  "#DD192F": "/characters/George.png",
  "#A10535": "/characters/Lee.png",
  "#4A043A": "/characters/Mazatada.png",
  "#C17F24": "/characters/Somchai.png",
};

const AMBIENT_CUSTOMERS = [
  { left: "22%", hairColor: "#1a0a00", shirtColor: "#3a5a8a", delay: "0s" },
  { left: "38%", hairColor: "#4a2a00", shirtColor: "#6a2a2a", delay: "-1.5s" },
  { left: "63%", hairColor: "#2a2a2a", shirtColor: "#2a4a2a", delay: "-0.8s" },
  { left: "76%", hairColor: "#8a5a1a", shirtColor: "#4a3a6a", delay: "-2.2s" },
];

// DungeonBg static data — hoisted to avoid per-render allocation
const BOTTLE_X    = [0.10,0.16,0.22,0.29,0.36,0.43,0.50,0.57,0.64,0.71,0.78,0.85,0.91];
const GLASS_X     = [0.25,0.45,0.55,0.75];
const PANEL_X     = [0.1,0.22,0.34,0.46,0.58,0.70,0.82];
const STOOL_X     = [0.17,0.28,0.39,0.50,0.61,0.72,0.83];
const POLE_X      = [0.31, 0.69];
const SPOT_X      = [0.27,0.50,0.73];
const TORCH_HALOS = [{l:118,t:"20%"},{r:118,t:"20%"},{l:98,t:"56%"},{r:98,t:"56%"}] as const;
const BARRELS     = [{x:60,s:"left"},{x:60,s:"right"}] as const;

// ── SVG pixel-art portrait for profile card ──────────────
function NPCPortraitSVG({ npc }: { npc: NPC }) {
  const skin = "#f4c896";
  const hair = npc.hairColor;
  const top  = npc.outfitColor;
  return (
    <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", imageRendering: "pixelated",
               filter: `drop-shadow(0 0 14px ${top}55)` }}>
      {/* Floor shadow */}
      <ellipse cx="40" cy="107" rx="18" ry="3" fill="rgba(0,0,0,0.3)"/>

      {/* Hair back */}
      <rect x="18" y="6"  width="44" height="35" rx="3" fill={hair}/>
      <rect x="14" y="22" width="8"  height="30" rx="2" fill={hair}/>
      <rect x="58" y="22" width="8"  height="30" rx="2" fill={hair}/>
      <rect x="16" y="50" width="6"  height="16" rx="2" fill={hair} opacity="0.7"/>
      <rect x="58" y="50" width="6"  height="16" rx="2" fill={hair} opacity="0.7"/>

      {/* Head */}
      <rect x="22" y="8"  width="36" height="28" rx="5" fill={skin}/>

      {/* Bangs */}
      <rect x="20" y="4"  width="40" height="12" rx="3" fill={hair}/>
      <rect x="22" y="12" width="10" height="5"  rx="2" fill={hair}/>
      <rect x="48" y="12" width="10" height="5"  rx="2" fill={hair}/>

      {/* Eyelashes */}
      <rect x="26" y="17" width="10" height="1.5" fill={hair}/>
      <rect x="44" y="17" width="10" height="1.5" fill={hair}/>

      {/* Eyes */}
      <rect x="28" y="18" width="6" height="5" rx="2" fill="#2a0225"/>
      <rect x="46" y="18" width="6" height="5" rx="2" fill="#2a0225"/>
      {/* Eye shine */}
      <rect x="29" y="19" width="2" height="2" rx="1" fill="#fff" opacity="0.8"/>
      <rect x="47" y="19" width="2" height="2" rx="1" fill="#fff" opacity="0.8"/>

      {/* Blush */}
      <ellipse cx="27" cy="26" rx="4" ry="2.5" fill="#DD192F" opacity="0.22"/>
      <ellipse cx="53" cy="26" rx="4" ry="2.5" fill="#DD192F" opacity="0.22"/>

      {/* Mouth */}
      <rect x="34" y="28" width="12" height="4" rx="2" fill="#DD192F"/>
      <rect x="37" y="29" width="6"  height="1.5" rx="1" fill="#ff6080" opacity="0.7"/>

      {/* Earring dot */}
      <circle cx="22" cy="26" r="2" fill="#FAC335"/>
      <circle cx="58" cy="26" r="2" fill="#FAC335"/>

      {/* Neck */}
      <rect x="34" y="36" width="12" height="8" fill={skin}/>

      {/* Crop top */}
      <rect x="22" y="42" width="36" height="18" rx="3" fill={top}/>
      {/* Shine stripe */}
      <rect x="28" y="44" width="24" height="5" rx="1" fill="rgba(255,255,255,0.18)"/>

      {/* Arms */}
      <rect x="12" y="43" width="12" height="6" rx="2" fill={skin}/>
      <rect x="56" y="43" width="12" height="6" rx="2" fill={skin}/>
      <rect x="8"  y="47" width="8"  height="16" rx="2" fill={skin}/>
      <rect x="64" y="47" width="8"  height="16" rx="2" fill={skin}/>
      {/* Hands */}
      <rect x="8"  y="61" width="8" height="6" rx="2" fill={skin}/>
      <rect x="64" y="61" width="8" height="6" rx="2" fill={skin}/>

      {/* Short skirt */}
      <rect x="20" y="58" width="40" height="15" rx="2" fill={top} opacity="0.8"/>
      <rect x="22" y="60" width="14" height="11" fill="rgba(0,0,0,0.15)"/>

      {/* Legs */}
      <rect x="26" y="73" width="10" height="20" fill={skin}/>
      <rect x="44" y="73" width="10" height="20" fill={skin}/>

      {/* Platform boots */}
      <rect x="23" y="91" width="15" height="8" rx="2" fill="#4A043A"/>
      <rect x="42" y="91" width="15" height="8" rx="2" fill="#4A043A"/>
      <rect x="27" y="97" width="6"  height="7" rx="1" fill="#4A043A"/>
      <rect x="46" y="97" width="6"  height="7" rx="1" fill="#4A043A"/>

      {/* Sparkle */}
      <circle cx="15" cy="10" r="2" fill="#FAC335" opacity="0.7"/>
    </svg>
  );
}

// ── Small SVG sprite body for bar scene ──────────────────
function NPCSpriteSmall({ npc, walking, size = 1 }: { npc: NPC; walking: boolean; size?: number }) {
  const skin = "#F5C5A0";
  const hair = npc.hairColor;
  const top  = npc.outfitColor;
  return (
    <svg viewBox="0 0 32 56" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 32 * size, height: 56 * size, imageRendering: "pixelated", overflow: "visible" }}>
      {/* Hair back */}
      <rect x="4"  y="1"  width="24" height="16" rx="2" fill={hair}/>
      <rect x="2"  y="7"  width="4"  height="14" rx="1" fill={hair}/>
      <rect x="26" y="7"  width="4"  height="14" rx="1" fill={hair}/>
      {/* Head */}
      <rect x="6"  y="3"  width="20" height="14" rx="3" fill={skin}/>
      {/* Bangs */}
      <rect x="5"  y="1"  width="22" height="6"  rx="2" fill={hair}/>
      <rect x="6"  y="6"  width="6"  height="3"  rx="1" fill={hair}/>
      <rect x="20" y="6"  width="6"  height="3"  rx="1" fill={hair}/>
      {/* Eyes */}
      <rect x="9"  y="8"  width="4"  height="3"  rx="1" fill="#2a0225"/>
      <rect x="19" y="8"  width="4"  height="3"  rx="1" fill="#2a0225"/>
      <rect x="10" y="9"  width="1.5" height="1.5" rx="0.5" fill="#fff" opacity="0.8"/>
      <rect x="20" y="9"  width="1.5" height="1.5" rx="0.5" fill="#fff" opacity="0.8"/>
      {/* Blush */}
      <ellipse cx="8"  cy="13" rx="2" ry="1.5" fill="#DD192F" opacity="0.2"/>
      <ellipse cx="24" cy="13" rx="2" ry="1.5" fill="#DD192F" opacity="0.2"/>
      {/* Mouth */}
      <rect x="13" y="13" width="6"  height="2"  rx="1" fill="#DD192F"/>
      {/* Neck */}
      <rect x="13" y="17" width="6"  height="4"  fill={skin}/>
      {/* Body */}
      <rect x="5"  y="20" width="22" height="14" rx="2" fill={top}/>
      <rect x="8"  y="22" width="16" height="4"  rx="1" fill="rgba(255,255,255,0.15)"/>
      {/* Arms */}
      <rect x="0"  y="21" width="6"  height="4"  rx="1" fill={skin}/>
      <rect x="26" y="21" width="6"  height="4"  rx="1" fill={skin}/>
      <rect x="0"  y="24" width="4"  height="8"  rx="1" fill={skin}/>
      <rect x="28" y="24" width="4"  height="8"  rx="1" fill={skin}/>
      {/* Skirt */}
      <rect x="4"  y="32" width="24" height="9"  rx="1" fill={top} opacity="0.8"/>
      {/* Left leg */}
      <g>
        <rect x="7" y="41" width="7" height="9" rx="1" fill={skin}/>
        {walking && (
          <animateTransform attributeName="transform" type="rotate"
            values="-6 10.5 41;6 10.5 41;-6 10.5 41" dur="0.4s" repeatCount="indefinite"/>
        )}
      </g>
      {/* Right leg */}
      <g>
        <rect x="18" y="41" width="7" height="9" rx="1" fill={skin}/>
        {walking && (
          <animateTransform attributeName="transform" type="rotate"
            values="6 21.5 41;-6 21.5 41;6 21.5 41" dur="0.4s" repeatCount="indefinite"/>
        )}
      </g>
      {/* Shoes */}
      <rect x="6"  y="48" width="9"  height="5" rx="1" fill="#4A043A"/>
      <rect x="17" y="48" width="9"  height="5" rx="1" fill="#4A043A"/>
    </svg>
  );
}

// ── Small NPC sprite for the bar scene ───────────────────
function NPCSprite({
  npc, active, done, walking, walkIndex, onClick,
}: {
  npc: NPC; active: boolean; done: boolean;
  walking: boolean; walkIndex: number; onClick: () => void;
}) {
  const pathIdx = walkIndex % 4;
  const offset  = `${walkIndex * -2.8}s`;

  return (
    <div
      className={walking ? `npc-path-${pathIdx}` : ""}
      style={walking ? { animationDelay: offset, position: "relative", zIndex: 2 } : { position: "relative", zIndex: 2 }}
    >
      <button
        onClick={onClick}
        disabled={done}
        className="flex flex-col items-center gap-1 transition-all"
        style={{ opacity: done ? 0.4 : 1, cursor: done ? "default" : "pointer", background: "none", border: "none", padding: 0 }}
      >
        <div
          className={walking ? `npc-face-${pathIdx}` : "pixel-bob"}
          style={{
            filter: active ? `drop-shadow(0 0 14px ${npc.outfitColor})` : "none",
            ...(walking ? { animationDelay: offset } : {}),
          }}
        >
          <div className={walking ? "walk-bob" : ""} style={{ position: "relative" }}>
            <NPCSpriteSmall npc={npc} walking={walking} />
            {/* TALK hint */}
            {!done && !active && (
              <div className="talk-bounce absolute -top-6 left-1/2 -translate-x-1/2"
                style={{ fontSize: "8px", color: "#FFE44D", whiteSpace: "nowrap", textShadow: "0 0 4px #FFB800" }}>
                TALK
              </div>
            )}
          </div>
        </div>
        <span style={{ fontSize: "7px", color: active ? "#FFE44D" : "#E0C8FF", textShadow: active ? "0 0 6px #FFB800" : "none", letterSpacing: "0.1em" }}>
          {npc.name.toUpperCase()}
        </span>
      </button>
    </div>
  );
}

// ── Pixel torch ──────────────────────────────────────────
function PixelTorch({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", width: 16, imageRendering: "pixelated", ...style }}>
      <div className="torch-flame-outer" style={{ width: 16, height: 18, position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 12, height: 14, background: "#FF6600", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 8, height: 10, background: "#FFAA00", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 6, background: "#FFE800", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
      </div>
      <div style={{ width: 6, height: 16, background: "#8B5E3C", border: "1px solid #5a3a1a", margin: "0 auto" }} />
      <div style={{ width: 14, height: 4, background: "#555", border: "1px solid #333", margin: "0 auto" }} />
    </div>
  );
}

// ── Barman behind counter ────────────────────────────────
const Barman = memo(function Barman() {
  return (
    <div className="barman-idle absolute" style={{ top: "calc(36% - 62px)", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
      <div style={{ width: 18, height: 18, background: "#D4A574", border: "2px solid #000", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 5, left: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", top: 5, right: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 5, height: 2, background: "#8a5a4a" }} />
      </div>
      <div style={{ position: "absolute", top: -5, left: -2, width: 22, height: 8, background: "#1a0a00", border: "2px solid #000", borderBottom: "none" }} />
      <div style={{ width: 22, height: 8, background: "#eee", border: "2px solid #000", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 1, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, background: "#cc2222", borderRadius: "50%" }} />
      </div>
      <div style={{ width: 26, height: 28, background: "#1a1a1a", border: "2px solid #333", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 2, left: 4, width: 8, height: 12, background: "#eee", clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", top: 2, right: 4, width: 8, height: 12, background: "#eee", clipPath: "polygon(0 0, 100% 0, 100% 100%, 40% 100%)" }} />
        <div style={{ position: "absolute", top: 4, left: -14, width: 14, height: 6, background: "#1a1a1a", border: "2px solid #333" }} />
        <div style={{ position: "absolute", top: 4, right: -14, width: 14, height: 6, background: "#1a1a1a", border: "2px solid #333" }} />
      </div>
    </div>
  );
});

// ── Bouncer at entrance ──────────────────────────────────
const Bouncer = memo(function Bouncer({ side }: { side: "left" | "right" }) {
  const xStyle = side === "left" ? { left: 58 } : { right: 58 };
  return (
    <div className="absolute" style={{ bottom: "16%", zIndex: 2, ...xStyle }}>
      <div style={{ width: 22, height: 22, background: "#8B6355", border: "2px solid #000", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 7, left: 4, width: 4, height: 4, background: "#000" }} />
        <div style={{ position: "absolute", top: 7, right: 4, width: 4, height: 4, background: "#000" }} />
        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 7, height: 2, background: "#5a3a2a" }} />
      </div>
      <div style={{ position: "absolute", top: -3, left: -1, width: 24, height: 6, background: "#5a3a2a", border: "2px solid #000", borderBottom: "none" }} />
      <div style={{ width: 14, height: 6, background: "#8B6355", border: "2px solid #000", margin: "0 auto" }} />
      <div style={{ width: 34, height: 38, background: "#1c1c1c", border: "2px solid #333", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 2, left: 4, width: 10, height: 14, background: "#2a2a2a", clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", top: 2, right: 4, width: 10, height: 14, background: "#2a2a2a", clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%)" }} />
        <div style={{ position: "absolute", top: 10, left: -8, width: 8, height: 8, background: "#1c1c1c", border: "2px solid #333" }} />
        <div style={{ position: "absolute", top: 10, right: -8, width: 8, height: 8, background: "#1c1c1c", border: "2px solid #333" }} />
        <div style={{ position: "absolute", top: 16, left: -6, right: -6, height: 6, background: "#1c1c1c", border: "1px solid #333" }} />
        {/* earpiece — opposite side to the body */}
        <div style={{ position: "absolute", top: -28, ...(side === "right" ? { left: -4 } : { right: -4 }), width: 4, height: 4, background: "#333", borderRadius: "50%", border: "1px solid #555" }} />
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <div style={{ width: 12, height: 18, background: "#1c1c1c", border: "2px solid #333" }} />
        <div style={{ width: 12, height: 18, background: "#1c1c1c", border: "2px solid #333" }} />
      </div>
    </div>
  );
});

// ── Sitting bar customer ─────────────────────────────────
const SittingCustomer = memo(function SittingCustomer({ left, hairColor, shirtColor, delay }: { left: string; hairColor: string; shirtColor: string; delay: string }) {
  return (
    <div className="sitting-bob absolute" style={{ top: "calc(36% + 2px)", left, zIndex: 1, animationDelay: delay }}>
      {/* head */}
      <div style={{ width: 14, height: 14, background: "#C8985A", border: "2px solid #000", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 4, left: 2, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", top: 4, right: 2, width: 3, height: 3, background: "#000" }} />
      </div>
      {/* hair */}
      <div style={{ position: "absolute", top: -4, left: -2, width: 18, height: 6, background: hairColor, border: "2px solid #000", borderBottom: "none" }} />
      <div style={{ width: 18, height: 20, background: shirtColor, border: "2px solid #000", margin: "0 auto" }} />
    </div>
  );
});

// ── Bar + Dungeon Background ─────────────────────────────
const DungeonBg = memo(function DungeonBg({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Stone floor */}
      <div style={{
        position: "absolute", inset: 0, background: "#1c1c24",
        backgroundImage: [
          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.5) 39px, rgba(0,0,0,0.5) 40px)",
          "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.5) 39px, rgba(0,0,0,0.5) 40px)",
        ].join(","),
      }} />
      {/* Ceiling band */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "26%", background: "#111118", borderBottom: "4px solid #2a2a36" }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "26%",
        backgroundImage: ["repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(0,0,0,0.5) 19px,rgba(0,0,0,0.5) 20px)", "repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,0,0,0.5) 39px,rgba(0,0,0,0.5) 40px)"].join(","),
      }} />
      {/* Side pillars */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 48, background: "linear-gradient(90deg,#0e0e14,#1a1a24)", borderRight: "3px solid #2e2e3e" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 48, background: "linear-gradient(270deg,#0e0e14,#1a1a24)", borderLeft: "3px solid #2e2e3e" }} />
      {/* Banners */}
      {(["left", "right"] as const).map((side) => (
        <div key={side} style={{ position: "absolute", top: "4%", ...(side === "left" ? { left: 60 } : { right: 60 }), width: 28, height: 90, background: color, border: "2px solid #000", boxShadow: `0 0 14px ${glow}88` }}>
          <div style={{ position: "absolute", top: "30%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", top: "55%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
          {[...Array(5)].map((_, i) => <div key={i} style={{ position: "absolute", bottom: -8, left: i * 6, width: 4, height: 8, background: color, border: "1px solid #000" }} />)}
        </div>
      ))}

      {/* ── BAR COUNTER ── */}
      <div style={{ position: "absolute", top: "26%", left: 52, right: 52, height: 10, background: "#1a0e06", border: "2px solid #3a1e0a" }} />
      {BOTTLE_X.map((x, i) => (
        <div key={i} style={{
          position: "absolute", top: "calc(26% - 24px)", left: `calc(${x * 100}%)`,
          width: 7, height: 24, borderRadius: "2px 2px 0 0",
          background: i % 4 === 0 ? "#1a4a10" : i % 4 === 1 ? "#7a3a10" : i % 4 === 2 ? "#1a2a5a" : "#5a1a1a",
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <div style={{ position: "absolute", top: 2, left: 1, right: 1, height: 3, background: "rgba(255,255,255,0.2)", borderRadius: "1px 1px 0 0" }} />
        </div>
      ))}
      {/* counter surface */}
      <div style={{ position: "absolute", top: "36%", left: 52, right: 52, height: 14, background: "#5c3a15", border: "2px solid #8B5E2F", boxShadow: "0 4px 12px rgba(0,0,0,0.7)" }} />
      {GLASS_X.map((x, i) => (
        <div key={i} style={{ position: "absolute", top: "calc(36% - 8px)", left: `calc(${x * 100}% - 3px)`, width: 8, height: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderTop: "none" }} />
      ))}
      <div style={{ position: "absolute", top: "calc(36% + 14px)", left: 52, right: 52, height: 28, background: "#3d2510", border: "2px solid #5c3520", borderTop: "none" }}>
        {PANEL_X.map((x, i) => (
          <div key={i} style={{ position: "absolute", top: 4, left: `${x * 100}%`, width: "10%", height: 16, border: "1px solid #5c3520aa" }} />
        ))}
      </div>
      {/* BAR neon sign */}
      <div className="neon-flicker" style={{ position: "absolute", top: "27%", left: "50%", transform: "translateX(-50%)", color: "#FF69B4", fontSize: "7px", fontFamily: "'Press Start 2P',monospace", textShadow: "0 0 8px #FF69B4,0 0 20px #FF69B4aa", letterSpacing: "0.35em", pointerEvents: "none", zIndex: 2, whiteSpace: "nowrap" }}>
        ★ BAR ★
      </div>
      {STOOL_X.map((x, i) => (
        <div key={i} style={{ position: "absolute", top: "calc(36% + 42px)", left: `calc(52px + ${x * 80}% - 8px)` }}>
          <div style={{ width: 18, height: 5, background: "#6B3A1F", border: "1px solid #3d2010", borderRadius: "50% 50% 0 0" }} />
          <div style={{ width: 3, height: 20, background: "#666", margin: "0 auto" }} />
          <div style={{ width: 12, height: 2, background: "#555", margin: "0 auto" }} />
        </div>
      ))}

      {/* ── DANCE FLOOR ── */}
      <div style={{ position: "absolute", top: "calc(36% + 80px)", left: "16%", right: "16%", bottom: "12%", background: "rgba(255,80,0,0.03)", border: "2px solid rgba(255,80,0,0.18)" }} />
      {POLE_X.map((x, i) => (
        <div key={i} style={{ position: "absolute", top: "calc(36% + 46px)", left: `calc(${x * 100}% - 3px)`, width: 6, bottom: "12%" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#999,#eee 40%,#bbb)", border: "1px solid #888" }} />
          <div style={{ position: "absolute", inset: 0, left: "30%", width: "25%", background: "rgba(255,255,255,0.35)" }} />
          <div style={{ position: "absolute", top: 0, left: -4, width: 14, height: 6, background: "#777", border: "1px solid #555" }} />
        </div>
      ))}
      {SPOT_X.map((x, i) => (
        <div key={i} className="stage-light" style={{ position: "absolute", top: "26%", left: `calc(${x * 100}% - 40px)`, width: 80, height: "38%", background: `radial-gradient(ellipse at 50% 0%, rgba(255,${i===1?"200":"100"},0,0.10) 0%, transparent 68%)`, pointerEvents: "none" }} />
      ))}
      <div style={{ position: "absolute", top: "calc(36% + 83px)", left: "50%", transform: "translateX(-50%)", color: "#FF4500", fontSize: "6px", fontFamily: "'Press Start 2P',monospace", textShadow: "0 0 6px #FF4500,0 0 14px #FF4500aa", letterSpacing: "0.2em", pointerEvents: "none", zIndex: 1, whiteSpace: "nowrap" }}>♪ DANCE FLOOR ♪</div>

      <PixelTorch style={{ top: "20%", left: 110 }} />
      <PixelTorch style={{ top: "20%", right: 110 }} />
      <PixelTorch style={{ top: "56%", left: 90 }} />
      <PixelTorch style={{ top: "56%", right: 90 }} />
      {TORCH_HALOS.map((pos, i) => (
        <div key={i} className="torch-glow" style={{ position: "absolute", top: pos.t, ...("l" in pos ? {left:(pos as {l:number;t:string}).l} : {right:(pos as {r:number;t:string}).r}), width: 60, height: 60, background: "radial-gradient(circle,rgba(255,140,0,0.25) 0%,transparent 70%)", transform: "translate(-50%,-30%)", pointerEvents: "none" }} />
      ))}

      {BARRELS.map((b, bi) => (
        <div key={bi} style={{ position: "absolute", bottom: 70, ...(b.s==="left"?{left:b.x}:{right:b.x}) }}>
          <div style={{ width: 28, height: 36, background: "#6B3A1F", border: "2px solid #3d2010", borderRadius: "4px", position: "relative", boxShadow: "2px 2px 0 #1a0d06" }}>
            {[6,14,22].map(t=><div key={t} style={{ position: "absolute", top: t, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />)}
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 70, left: 96, width: 20, height: 20, background: "#7B5030", border: "2px solid #3d2010", boxShadow: "2px 2px 0 #1a0d06" }}>
        <div style={{ position: "absolute", top: 1, left: 1, right: 1, bottom: 1, border: "1px solid #3d2010" }} />
      </div>

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.65) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: color, opacity: 0.04, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.18) 3px,rgba(0,0,0,0.18) 4px)", opacity: 0.5 }} />
    </div>
  );
});

// ── Stat helpers (deterministic from npc id) ─────────────
const NPC_ROLES      = ["Coyote Dancer","Go-Go Dancer","Bar Girl","VIP Hostess","Cocktail Waitress"];
const NPC_HOMETOWNS  = ["Korat","Chiang Mai","Bangkok","Pattaya","Khon Kaen","Udon Thani","Surin"];

function npcHash(id: string, seed: number): number {
  let h = seed + 7;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h;
}
const npcStat     = (id: string, s: number) => (npcHash(id, s) % 7) + 4;
const npcLevel    = (id: string)            => (npcHash(id, 3) % 20) + 5;
const npcRole     = (id: string)            => NPC_ROLES[npcHash(id, 11) % NPC_ROLES.length];
const npcHometown = (id: string)            => NPC_HOMETOWNS[npcHash(id, 17) % NPC_HOMETOWNS.length];

// ── Profile stat bar ─────────────────────────────────────
function ProfileStatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: "9px", color: "#C080A0", width: 52, textAlign: "right", flexShrink: 0, letterSpacing: "0.04em" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 8, background: "#1a0010", border: "1px solid #2a1020", overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${(value / 10) * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          boxShadow: `0 0 6px ${color}99`,
        }} />
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────
type Phase = "browse" | "profile" | "talking" | "guess" | "reveal" | "complete";

export default function StorePage({ params }: { params: Promise<{ store: string }> }) {
  const { store }   = use(params);
  const { suitColor } = useGame();

  const meta    = storeMeta[store];
  const npcs    = storeNPCs[store] ?? [];
  const charImg = playerChars[suitColor] ?? "/characters/George.png";

  const [phase, setPhase]                   = useState<Phase>("browse");
  const [npcIndex, setNpcIndex]             = useState(0);
  const [turnIndex, setTurnIndex]           = useState(0);
  const [clues, setClues]                   = useState<string[]>([]);
  const [latestClue, setLatestClue]         = useState<string | null>(null);
  const [score, setScore]                   = useState(0);
  const [hearts, setHearts]                 = useState(3);
  const [results, setResults]               = useState<{ name: string; correct: boolean }[]>([]);
  const [doneNPCs, setDoneNPCs]             = useState<Set<number>>(new Set());
  const [revealCorrect, setRevealCorrect]   = useState<boolean | null>(null);
  const [dialogueClosed, setDialogueClosed] = useState(false);
  const [hintClosed, setHintClosed]         = useState(false);
  const [profileIdx, setProfileIdx]         = useState(0);
  const [gameResult, setGameResult]         = useState<"victory" | "loss" | null>(null);

  const {
    muted, toggleMute,
    startAmbient, stopAmbient,
    playVoiceLine, stopVoice,
    playClick, playReveal, playVictory, playLoss,
  } = useGameAudio();

  // Typewriter state
  const [displayedLineText, setDisplayedLineText] = useState("");
  const [isTyping, setIsTyping]                   = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTyping() {
    if (typingRef.current) { clearInterval(typingRef.current); typingRef.current = null; }
  }

  function skipTyping(fullText: string) {
    clearTyping();
    setDisplayedLineText(fullText);
    setIsTyping(false);
  }

  // Start ambient on first user gesture
  useEffect(() => {
    const handler = () => { startAmbient(); window.removeEventListener("pointerdown", handler); };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [startAmbient]);

  // Typewriter + voice when dialogue line changes
  useEffect(() => {
    const npc = npcs[npcIndex];
    if (!npc || dialogueClosed) return;

    let lineText = "";
    if (phase === "talking") {
      lineText = npc.dialogues[turnIndex]?.npcLine ?? "";
    } else if (phase === "guess") {
      lineText = "After spending time with me... what is your read, na ka~?";
    }
    if (!lineText) return;

    clearTyping();
    setDisplayedLineText("");
    setIsTyping(true);
    stopVoice();

    const charMs = playVoiceLine(lineText, npc.id);
    let charIdx = 0;

    typingRef.current = setInterval(() => {
      charIdx++;
      setDisplayedLineText(lineText.slice(0, charIdx));
      if (charIdx >= lineText.length) {
        clearTyping();
        setIsTyping(false);
      }
    }, charMs);

    return () => { clearTyping(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turnIndex, npcIndex, dialogueClosed]);

  // Stop voice when dialogue is closed
  useEffect(() => {
    if (dialogueClosed) { stopVoice(); clearTyping(); setIsTyping(false); }
  }, [dialogueClosed, stopVoice]);

  // Fanfare when game ends
  useEffect(() => {
    if (phase !== "complete") return;
    stopAmbient();
    if (gameResult === "victory") playVictory();
    else if (gameResult === "loss") playLoss();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, gameResult]);

  if (!meta) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0020] text-white">
        <p>Store not found.</p>
        <Link href="/game" className="underline ml-4 text-purple-300">Back</Link>
      </div>
    );
  }

  const currentNPC   = npcs[npcIndex];
  const currentTurn  = currentNPC?.dialogues[turnIndex];
  const showDialogue = (phase === "talking" || phase === "guess") && !dialogueClosed && currentNPC;

  function startTalking(idx: number) {
    setNpcIndex(idx); setTurnIndex(0); setClues([]); setLatestClue(null);
    setDialogueClosed(false); setPhase("talking");
  }

  function handleChoice(clue: string | null) {
    if (clue) { setClues(p => [...p, clue]); setLatestClue(clue); } else setLatestClue(null);
    const next = turnIndex + 1;
    if (next >= currentNPC.dialogues.length) setPhase("guess");
    else setTurnIndex(next);
  }

  function handleGuess(guessedLadyboy: boolean) {
    const correct = guessedLadyboy === currentNPC.isLadyboy;
    setRevealCorrect(correct);
    if (correct) setScore(s => s + 1); else setHearts(h => Math.max(0, h - 1));
    setResults(p => [...p, { name: currentNPC.name, correct }]);
    playReveal(correct);
    setPhase("reveal");
  }

  function continueAfterReveal() {
    const newDoneSize = doneNPCs.size + 1;
    // revealCorrect and hearts are both stale closures here (their setters were
    // called in handleGuess but not yet applied), so derive the effective values.
    const effectiveHearts = revealCorrect ? hearts : hearts - 1;
    setDoneNPCs(prev => new Set([...prev, npcIndex]));
    if (newDoneSize >= npcs.length || effectiveHearts <= 0) {
      setGameResult(effectiveHearts <= 0 ? "loss" : "victory");
      setPhase("complete");
    } else { setPhase("browse"); setLatestClue(null); setClues([]); setHintClosed(false); }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none flex flex-col"
      style={{ fontFamily: "'Press Start 2P','Courier New',monospace" }}>
      <DungeonBg color={meta.color} glow={meta.glow} />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-stretch h-10 shrink-0">
        <Link href="/game" className="flex items-center px-3 hover:brightness-125 transition-all"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderRight: "none" }}>
          <span style={{ color: "#FFE44D", fontSize: "8px" }}>◀ MAP</span>
        </Link>
        <div className="flex-1 flex items-center justify-center"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderLeft: "none", borderRight: "none" }}>
          <span style={{ color: meta.color, fontSize: "12px", letterSpacing: "0.2em", textShadow: `0 0 10px ${meta.glow}` }}>{meta.label}</span>
        </div>
        <div className="flex items-center gap-2 px-3"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderLeft: "none" }}>
          <span style={{ color: "#FF4444", fontSize: "10px" }}>{"♥".repeat(hearts)}{"♡".repeat(3 - hearts)}</span>
          <span style={{ color: "#FFE44D", fontSize: "8px" }}>{score}/{npcs.length}</span>
          <button
            onClick={toggleMute}
            title={muted ? "Unmute" : "Mute"}
            style={{ background: "none", border: "none", cursor: "pointer", color: muted ? "#555" : "#E0C8FF", fontSize: "14px", lineHeight: 1, padding: "0 2px" }}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      {/* ── Scene ── */}
      <div className="relative z-10 flex-1">
        {AMBIENT_CUSTOMERS.map((c, i) => <SittingCustomer key={i} {...c} />)}
        <Barman />
        <Bouncer side="left" />
        <Bouncer side="right" />

        {/* NPCs on dance floor */}
        <div className="absolute left-0 right-0" style={{ top: "38%" }}>
          <div className="flex items-end justify-around px-20">
            {npcs.map((npc, i) => (
              <NPCSprite
                key={npc.id}
                npc={npc}
                active={phase === "talking" && npcIndex === i}
                done={doneNPCs.has(i)}
                walking={phase === "browse" && !doneNPCs.has(i)}
                walkIndex={i}
                onClick={() => {
                  if (phase === "browse" && !doneNPCs.has(i)) { setHintClosed(true); setProfileIdx(i); setPhase("profile"); }
                  else if ((phase === "talking" || phase === "guess") && npcIndex === i && dialogueClosed) setDialogueClosed(false);
                }}
              />
            ))}
          </div>
        </div>

        {/* Player character */}
        <div className="absolute" style={{ bottom: "8%", left: 64, width: 48, height: 64 }}>
          <Image src={charImg} alt="player" fill className="object-contain pixelated" />
        </div>

        {/* ── Profile card overlay ── */}
        {phase === "profile" && npcs[profileIdx] && (() => {
          const npc = npcs[profileIdx];
          return (
            <div className="absolute inset-0 z-30 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(3px)" }}>
              <div style={{
                width: "min(340px, 88vw)",
                background: "linear-gradient(180deg, #1a0010, #0c0008)",
                border: `3px solid ${npc.outfitColor}`,
                boxShadow: `0 0 40px ${npc.outfitColor}55, 0 0 80px ${npc.outfitColor}22`,
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "28px 24px 20px", gap: 12,
                fontFamily: "'Press Start 2P', monospace",
              }}>
                {/* SVG pixel-art portrait */}
                <div style={{ width: 150, height: 206 }}>
                  <NPCPortraitSVG npc={npc} />
                </div>

                {/* Name */}
                <div style={{ color: "#FAC335", fontSize: "clamp(14px, 4vw, 20px)", letterSpacing: "0.15em", textShadow: "0 0 10px #FAC335, 0 0 24px #FF8C00", textAlign: "center" }}>
                  {npc.name.toUpperCase()}
                </div>

                {/* Role */}
                <div style={{ color: "#FF69B4", fontSize: "10px", letterSpacing: "0.12em" }}>
                  {npcRole(npc.id)}
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  <span style={{ fontSize: "8px", padding: "3px 8px", background: "#200010", border: "1px solid #482D40", color: "#C080A0" }}>
                    LV.{npcLevel(npc.id)}
                  </span>
                  <span style={{ fontSize: "8px", padding: "3px 8px", background: "#200010", border: "1px solid #482D40", color: "#C080A0" }}>
                    {npcHometown(npc.id).toUpperCase()}
                  </span>
                  <span style={{ fontSize: "8px", padding: "3px 8px", background: "#DD192F", color: "#fff", boxShadow: "0 0 6px #DD192F88", fontFamily: "sans-serif" }}>
                    🔥 HOT
                  </span>
                </div>

                {/* Divider */}
                <div style={{ width: "100%", height: 1, background: "#482D40" }} />

                {/* Stat bars */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <ProfileStatBar label="CHARM"  value={npcStat(npc.id, 1)} color="#DD192F" />
                  <ProfileStatBar label="DANCE"  value={npcStat(npc.id, 2)} color="#A10535" />
                  <ProfileStatBar label="HUSTLE" value={npcStat(npc.id, 3)} color="#FAC335" />
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 4 }}>
                  <button
                    onClick={() => setPhase("browse")}
                    style={{ flex: 1, padding: "10px", background: "#0c0008", border: "2px solid #482D40", color: "#8A5070", fontSize: "9px", cursor: "pointer", letterSpacing: "0.12em", fontFamily: "'Press Start 2P', monospace" }}>
                    ✕ CLOSE
                  </button>
                  <button
                    onClick={() => startTalking(profileIdx)}
                    style={{ flex: 2, padding: "10px", background: "linear-gradient(180deg, #4A043A, #100008)", border: "2px solid #C060FF", color: "#E8B0FF", fontSize: "9px", cursor: "pointer", boxShadow: "0 0 14px rgba(192,96,255,0.35)", textShadow: "0 0 6px #C060FF", letterSpacing: "0.12em", fontFamily: "'Press Start 2P', monospace" }}>
                    ▶ TALK
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Browse hint */}
        {phase === "browse" && !hintClosed && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-3"
            style={{ background: "#0d0020dd", border: `2px solid ${meta.color}`, boxShadow: `0 0 14px ${meta.color}44`, whiteSpace: "nowrap" }}>
            <p style={{ color: "#E0C8FF", fontSize: "9px", letterSpacing: "0.08em" }}>
              {doneNPCs.size === 0 ? "▲ CLICK A GIRL TO TALK TO HER" : `${npcs.length - doneNPCs.size} GIRL${npcs.length - doneNPCs.size !== 1 ? "S" : ""} REMAINING — CHOOSE WISELY`}
            </p>
            <button onClick={() => setHintClosed(true)} style={{ color: "#9B59B6", fontSize: "16px", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: "0 2px" }}>×</button>
          </div>
        )}

        {/* Resume hint */}
        {(phase === "talking" || phase === "guess") && dialogueClosed && currentNPC && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2"
            style={{ background: "#0d0020dd", border: `2px solid ${currentNPC.outfitColor}`, whiteSpace: "nowrap" }}>
            <span style={{ color: currentNPC.outfitColor, fontSize: "8px" }}>▶ CLICK {currentNPC.name.toUpperCase()} TO CONTINUE</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            FULL-SIZE DIALOGUE BOX
        ══════════════════════════════════════════════════ */}
        {showDialogue && (
          <div className="dialogue-overlay absolute inset-0 z-30 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}>
            <div className="dialogue-box"
              style={{
                width: "92vw", maxWidth: 960,
                maxHeight: "84vh",
                background: "#08001aee",
                border: `3px solid ${currentNPC.outfitColor}`,
                boxShadow: `0 0 40px ${currentNPC.outfitColor}55, 0 0 80px ${currentNPC.outfitColor}22, inset 0 0 60px rgba(0,0,0,0.6)`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}>

              {/* ── Header bar ── */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 18px",
                background: `linear-gradient(90deg, ${currentNPC.outfitColor}25, transparent)`,
                borderBottom: `2px solid ${currentNPC.outfitColor}55`,
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: currentNPC.outfitColor, fontSize: "7px", letterSpacing: "0.3em", textShadow: `0 0 8px ${currentNPC.outfitColor}` }}>
                    {phase === "talking" ? "◆ CONVERSATION" : "◆ MOMENT OF TRUTH"}
                  </span>
                  {phase === "talking" && (
                    <span className="speaking-dots" style={{ color: "#FFE44D", fontSize: "9px" }}>●●●</span>
                  )}
                </div>
                <button onClick={() => setDialogueClosed(true)}
                  style={{ color: "#888", fontSize: "22px", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: "0 4px", transition: "color 0.2s" }}
                  title="Close — click girl to reopen">
                  ×
                </button>
              </div>

              {/* ── Content row ── */}
              <div className="dialogue-content" style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>

                {/* LEFT — Portrait panel */}
                <div className="portrait-panel" style={{
                  width: 220,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "24px 16px",
                  background: `linear-gradient(180deg, ${currentNPC.outfitColor}12 0%, transparent 100%)`,
                  borderRight: `2px solid ${currentNPC.outfitColor}33`,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* corner decoration */}
                  <div style={{ position: "absolute", top: 8, left: 8, width: 20, height: 20, borderTop: `2px solid ${currentNPC.outfitColor}77`, borderLeft: `2px solid ${currentNPC.outfitColor}77` }} />
                  <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderTop: `2px solid ${currentNPC.outfitColor}77`, borderRight: `2px solid ${currentNPC.outfitColor}77` }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8, width: 20, height: 20, borderBottom: `2px solid ${currentNPC.outfitColor}77`, borderLeft: `2px solid ${currentNPC.outfitColor}77` }} />
                  <div style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderBottom: `2px solid ${currentNPC.outfitColor}77`, borderRight: `2px solid ${currentNPC.outfitColor}77` }} />
                  {/* portrait glow background */}
                  <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 160, height: 160, background: `radial-gradient(circle, ${currentNPC.outfitColor}22 0%, transparent 70%)`, pointerEvents: "none" }} />

                  {/* Sprite — same look as dance floor, scaled up 3.5× */}
                  <div className="npc-portrait-bob" style={{
                    imageRendering: "pixelated",
                    filter: `drop-shadow(0 0 16px ${currentNPC.outfitColor}88)`,
                  }}>
                    <NPCSpriteSmall npc={currentNPC} walking={phase === "talking"} size={3.5} />
                  </div>

                  {/* Name plate */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: currentNPC.outfitColor, fontSize: "13px", letterSpacing: "0.2em", textShadow: `0 0 10px ${currentNPC.outfitColor}`, marginBottom: 4 }}>
                      {currentNPC.name.toUpperCase()}
                    </div>
                    <div style={{ color: "#888", fontSize: "7px", letterSpacing: "0.15em" }}>
                      {meta.label}
                    </div>
                  </div>

                  {/* Clues shown under portrait in guess phase */}
                  {phase === "guess" && clues.length > 0 && (
                    <div style={{ width: "100%", padding: "10px 8px", background: "rgba(155,89,182,0.12)", border: "1px solid #9B59B644" }}>
                      <p style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.1em", marginBottom: 6 }}>📋 YOUR CLUES:</p>
                      {clues.map((cl, i) => (
                        <p key={i} style={{ color: "#C8A8E0", fontSize: "8px", fontFamily: "sans-serif", fontStyle: "italic", lineHeight: 1.6, marginBottom: 4 }}>• {cl}</p>
                      ))}
                    </div>
                  )}

                  {/* Clue flash in talking phase */}
                  {phase === "talking" && latestClue && (
                    <div className="clue-flash" style={{ width: "100%", padding: "8px", background: "#1a0030cc", border: "1px solid #FFE44D55", textAlign: "center" }}>
                      <span style={{ color: "#FFE44D", fontSize: "8px", fontFamily: "sans-serif", fontStyle: "italic", textShadow: "0 0 6px #FFB800" }}>
                        👁 {latestClue}
                      </span>
                    </div>
                  )}
                </div>

                {/* RIGHT — Dialogue content */}
                <div className="speech-panel" style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px 24px 20px",
                  overflowY: "auto",
                  gap: 16,
                }}>
                  {/* ── TALKING phase ── */}
                  {phase === "talking" && currentTurn && (
                    <>
                      {/* Speech bubble — click to skip typewriter */}
                      <div
                        onClick={() => isTyping ? skipTyping(currentTurn.npcLine) : undefined}
                        style={{
                          flex: 1,
                          padding: "18px 20px",
                          background: "rgba(255,255,255,0.04)",
                          border: `2px solid ${currentNPC.outfitColor}44`,
                          borderLeft: `4px solid ${currentNPC.outfitColor}`,
                          position: "relative",
                          cursor: isTyping ? "pointer" : "default",
                        }}>
                        {/* quotation mark decoration */}
                        <div style={{ position: "absolute", top: 8, left: 14, fontSize: "28px", color: `${currentNPC.outfitColor}33`, lineHeight: 1, pointerEvents: "none", fontFamily: "serif" }}>"</div>
                        <p style={{ color: "#EEE0FF", fontSize: "14px", lineHeight: 2.0, fontFamily: "sans-serif", paddingLeft: 20, paddingTop: 8, paddingRight: 8 }}>
                          {displayedLineText}
                          {isTyping && <span className="type-cursor">|</span>}
                        </p>
                        {isTyping && (
                          <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: "7px", color: `${currentNPC.outfitColor}77`, letterSpacing: "0.1em" }}>CLICK TO SKIP</span>
                        )}
                      </div>

                      {/* Player choices — only show when typing is done */}
                      {!isTyping && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <p style={{ color: "#9B59B6", fontSize: "8px", letterSpacing: "0.15em" }}>YOUR RESPONSE:</p>
                        {currentTurn.choices.map((c, i) => (
                          <button key={i} onClick={() => { playClick(); handleChoice(c.clue); }}
                            className="choice-btn"
                            style={{
                              textAlign: "left", padding: "14px 18px",
                              background: "#180038",
                              border: "2px solid #9B59B6",
                              color: "#D8C0FF",
                              fontSize: "12px", lineHeight: 1.7,
                              fontFamily: "sans-serif",
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}>
                            <span style={{ color: currentNPC.outfitColor, marginRight: 10 }}>▶</span>{c.text}
                          </button>
                        ))}
                      </div>
                      )}
                    </>
                  )}

                  {/* ── GUESS phase ── */}
                  {phase === "guess" && (
                    <>
                      <div
                        onClick={() => isTyping ? skipTyping(`After spending time with me... what is your read, na ka~?`) : undefined}
                        style={{ padding: "18px 20px", background: "rgba(255,200,0,0.05)", border: "2px solid #FFE44D44", borderLeft: "4px solid #FFE44D", cursor: isTyping ? "pointer" : "default", position: "relative" }}>
                        <p style={{ color: "#FFE44D", fontSize: "11px", letterSpacing: "0.12em", marginBottom: 10, textShadow: "0 0 6px #FFB800" }}>
                          🤔 TIME TO DECIDE
                        </p>
                        <p style={{ color: "#EEE0FF", fontSize: "15px", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                          {displayedLineText}
                          {isTyping && <span className="type-cursor">|</span>}
                        </p>
                        {isTyping && <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: "7px", color: "#FFE44D55" }}>CLICK TO SKIP</span>}
                      </div>

                      {!isTyping && <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                        <button onClick={() => { playClick(); handleGuess(false); }}
                          className="guess-btn"
                          style={{ flex: 1, padding: "20px 12px", background: "#112211", border: "3px solid #4CAF50", color: "#6FE87A", fontSize: "13px", fontFamily: "'Press Start 2P',monospace", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 16px #4CAF5033", lineHeight: 1.6 }}>
                          👧<br />REAL GIRL
                        </button>
                        <button onClick={() => { playClick(); handleGuess(true); }}
                          className="guess-btn"
                          style={{ flex: 1, padding: "20px 12px", background: "#221128", border: "3px solid #FF69B4", color: "#FF9ECC", fontSize: "13px", fontFamily: "'Press Start 2P',monospace", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 16px #FF69B433", lineHeight: 1.6 }}>
                          💅<br />LADYBOY
                        </button>
                      </div>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Reveal overlay ── */}
        {phase === "reveal" && currentNPC && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-30">
            <div style={{ width: "min(420px,90vw)", padding: "32px", background: "#0a0018", border: `4px solid ${revealCorrect ? "#4CAF50" : "#FF4444"}`, boxShadow: `0 0 40px ${revealCorrect ? "#4CAF5088" : "#FF444488"}`, display: "flex", flexDirection: "column", gap: 16 }}>
              <p className="text-center" style={{ color: revealCorrect ? "#6FE87A" : "#FF6666", fontSize: "20px", textShadow: `0 0 12px ${revealCorrect ? "#4CAF50" : "#FF4444"}`, letterSpacing: "0.2em" }}>
                {revealCorrect ? "✓ CORRECT!" : "✗ WRONG!"}
              </p>
              <p style={{ color: currentNPC.outfitColor, fontSize: "11px", textAlign: "center", textShadow: `0 0 6px ${currentNPC.outfitColor}` }}>
                {currentNPC.name.toUpperCase()} — <span style={{ color: "#FFE44D" }}>{currentNPC.isLadyboy ? "LADYBOY" : "REAL GIRL"}</span>
              </p>
              <p style={{ color: "#C8A8E0", fontSize: "11px", lineHeight: 1.9, fontFamily: "sans-serif" }}>{currentNPC.reveal}</p>
              <button onClick={continueAfterReveal} style={{ padding: "12px", background: "#1a0040", border: `2px solid ${meta.color}`, color: meta.color, fontSize: "10px", letterSpacing: "0.15em", cursor: "pointer", boxShadow: `0 0 10px ${meta.color}44`, fontFamily: "'Press Start 2P',monospace" }}>
                CONTINUE ▶
              </button>
            </div>
          </div>
        )}

        {/* ── Complete overlay — Victory / Loss ── */}
        {phase === "complete" && (() => {
          const isVictory = gameResult === "victory";
          const isPerfect = score === npcs.length;
          const accentColor  = isVictory ? "#FFE44D" : "#FF4444";
          const accentGlow   = isVictory ? "#FFB800" : "#CC0000";
          const bgGradient   = isVictory
            ? "linear-gradient(180deg, #0a0800 0%, #140c00 60%, #0a0018 100%)"
            : "linear-gradient(180deg, #0a0000 0%, #150000 60%, #0a0018 100%)";
          const borderColor  = isVictory ? "#FFE44D" : "#FF4444";
          const titleText    = isPerfect ? "PERFECT!" : isVictory ? "VICTORY!" : "GAME OVER";
          const subtitleText = isPerfect
            ? "FLAWLESS INSTINCTS — NOTHING GETS PAST YOU"
            : isVictory
            ? `${score} OUT OF ${npcs.length} — SHARP EYES`
            : "YOU RAN OUT OF HEARTS";

          return (
            <div className="absolute inset-0 flex items-center justify-center z-30 result-screen-enter"
              style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(4px)" }}>

              {/* Particle layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isVictory && [...Array(18)].map((_, i) => (
                  <div key={i} className="confetti-particle"
                    style={{
                      position: "absolute",
                      left: `${(i * 5.5 + 3) % 100}%`,
                      top: "-10%",
                      width: 8, height: 8,
                      background: ["#FFE44D","#FF69B4","#6FE87A","#00BFFF","#FF4500","#C060FF"][i % 6],
                      animationDelay: `${(i * 0.18) % 2.4}s`,
                    }} />
                ))}
              </div>

              <div style={{
                width: "min(460px, 94vw)",
                background: bgGradient,
                border: `4px solid ${borderColor}`,
                boxShadow: `0 0 60px ${accentGlow}55, 0 0 120px ${accentGlow}22, inset 0 0 80px rgba(0,0,0,0.7)`,
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "36px 28px 28px", gap: 0,
                position: "relative",
                fontFamily: "'Press Start 2P', monospace",
              }}>
                {/* Corner brackets */}
                {(["tl","tr","bl","br"] as const).map(c => (
                  <div key={c} style={{
                    position: "absolute",
                    ...(c[0]==="t" ? { top: 10 } : { bottom: 10 }),
                    ...(c[1]==="l" ? { left: 10 } : { right: 10 }),
                    width: 20, height: 20,
                    borderTop:    c[0]==="t" ? `2px solid ${borderColor}88` : "none",
                    borderBottom: c[0]==="b" ? `2px solid ${borderColor}88` : "none",
                    borderLeft:   c[1]==="l" ? `2px solid ${borderColor}88` : "none",
                    borderRight:  c[1]==="r" ? `2px solid ${borderColor}88` : "none",
                  }} />
                ))}

                {/* Big icon */}
                <div className="result-icon-pop" style={{ fontSize: 64, lineHeight: 1, marginBottom: 16 }}>
                  {isPerfect ? "🏆" : isVictory ? "🎉" : "💔"}
                </div>

                {/* Title */}
                <div className="result-title-flash" style={{
                  fontSize: "clamp(22px, 6vw, 32px)",
                  color: accentColor,
                  textShadow: `0 0 14px ${accentGlow}, 0 0 32px ${accentGlow}88`,
                  letterSpacing: "0.25em",
                  marginBottom: 10,
                  textAlign: "center",
                }}>
                  {titleText}
                </div>

                {/* Subtitle */}
                <div style={{ color: "#C8A8E0", fontSize: "9px", letterSpacing: "0.12em", textAlign: "center", marginBottom: 24 }}>
                  {subtitleText}
                </div>

                {/* Score display */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
                  padding: "14px 28px",
                  background: `${accentColor}12`,
                  border: `2px solid ${accentColor}44`,
                }}>
                  <span style={{ color: "#888", fontSize: "9px", letterSpacing: "0.1em" }}>SCORE</span>
                  <span style={{ color: accentColor, fontSize: "32px", textShadow: `0 0 12px ${accentGlow}`, letterSpacing: "0.1em" }}>
                    {score}<span style={{ color: "#555", fontSize: "18px" }}>/{npcs.length}</span>
                  </span>
                  <span style={{ color: "#FF4444", fontSize: "13px" }}>{"♥".repeat(Math.max(0, hearts))}{"♡".repeat(Math.max(0, 3 - hearts))}</span>
                </div>

                {/* Results breakdown */}
                <div style={{
                  width: "100%", marginBottom: 22,
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                  {results.map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px",
                      background: r.correct ? "rgba(79,175,74,0.08)" : "rgba(255,68,68,0.08)",
                      border: `1px solid ${r.correct ? "#4CAF5033" : "#FF444433"}`,
                    }}>
                      <span style={{ color: r.correct ? "#6FE87A" : "#FF6666", fontSize: "12px", flexShrink: 0 }}>
                        {r.correct ? "✓" : "✗"}
                      </span>
                      <span style={{ color: r.correct ? "#6FE87A" : "#FF9090", fontSize: "8px", flex: 1, letterSpacing: "0.1em" }}>
                        {r.name.toUpperCase()}
                      </span>
                      <span style={{ color: r.correct ? "#4CAF5066" : "#FF444466", fontSize: "7px" }}>
                        {r.correct ? "CORRECT" : "WRONG"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 12, width: "100%" }}>
                  <Link href="/game" style={{
                    flex: 1, padding: "12px", textAlign: "center",
                    background: "#0d0020", border: `2px solid ${meta.color}`,
                    color: meta.color, fontSize: "8px", letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}>
                    ◀ MAP
                  </Link>
                  <button
                    onClick={() => {
                      setPhase("browse"); setScore(0); setHearts(3); setResults([]);
                      setDoneNPCs(new Set()); setNpcIndex(0); setTurnIndex(0);
                      setClues([]); setLatestClue(null); setHintClosed(false);
                      setDialogueClosed(false); setGameResult(null);
                    }}
                    style={{
                      flex: 1, padding: "12px",
                      background: isVictory ? "#1a1000" : "#1a0000",
                      border: `2px solid ${accentColor}`,
                      color: accentColor, fontSize: "8px", letterSpacing: "0.1em",
                      cursor: "pointer",
                    }}>
                    ↺ RETRY
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 h-8 flex items-center justify-center shrink-0" style={{ background: "#0d0020", borderTop: `2px solid ${meta.color}44` }}>
        <span style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.3em" }}>AGOGO ADVENTURE: THE GOLDEN ERA</span>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }

        /* ── Base animations ── */
        @keyframes pixelBob {
          0%,100%{ transform:translateY(0); }
          50%    { transform:translateY(-4px); }
        }
        .pixel-bob { animation: pixelBob 1.6s ease-in-out infinite; }

        @keyframes talkBounce {
          0%,100%{ transform:translateX(-50%) translateY(0); }
          50%    { transform:translateX(-50%) translateY(-3px); }
        }
        .talk-bounce { animation: talkBounce 0.8s ease-in-out infinite; }

        @keyframes portraitBob {
          0%,100%{ transform:translateY(0); }
          50%    { transform:translateY(-5px); }
        }
        .npc-portrait-bob { animation: portraitBob 2s ease-in-out infinite; }

        @keyframes sittingBob {
          0%,100%{ transform:translateY(0); }
          50%    { transform:translateY(-2px); }
        }
        .sitting-bob { animation: sittingBob 2.4s ease-in-out infinite; }

        @keyframes barmanIdle {
          0%,100%{ transform:translateX(-50%) rotate(0deg); }
          30%    { transform:translateX(-50%) rotate(-3deg); }
          70%    { transform:translateX(-50%) rotate(3deg); }
        }
        .barman-idle { animation: barmanIdle 2s ease-in-out infinite; }

        /* ── Torch ── */
        @keyframes flameFlicker {
          0%,100%{ transform:translateX(-50%) scaleX(1) scaleY(1); opacity:1; }
          25%    { transform:translateX(-50%) scaleX(0.85) scaleY(1.1); opacity:0.9; }
          50%    { transform:translateX(-50%) scaleX(1.1) scaleY(0.95); opacity:1; }
          75%    { transform:translateX(-50%) scaleX(0.9) scaleY(1.05); opacity:0.85; }
        }
        .torch-flame-outer>div:nth-child(1){ animation:flameFlicker 0.18s ease-in-out infinite; transform-origin:bottom center; }
        .torch-flame-outer>div:nth-child(2){ animation:flameFlicker 0.22s ease-in-out infinite 0.05s; transform-origin:bottom center; }
        .torch-flame-outer>div:nth-child(3){ animation:flameFlicker 0.15s ease-in-out infinite 0.03s; transform-origin:bottom center; }

        @keyframes glowPulse {
          0%,100%{ opacity:0.8; transform:translate(-50%,-30%) scale(1); }
          50%    { opacity:1.0; transform:translate(-50%,-30%) scale(1.15); }
        }
        .torch-glow { animation: glowPulse 0.3s ease-in-out infinite; }

        @keyframes lightPulse {
          0%,100%{ opacity:1; }
          50%    { opacity:0.55; }
        }
        .stage-light { animation: lightPulse 2.2s ease-in-out infinite; }

        @keyframes neonFlicker {
          0%,90%,100%{ opacity:1; }
          92%         { opacity:0.4; }
          95%         { opacity:1; }
          97%         { opacity:0.6; }
        }
        .neon-flicker { animation: neonFlicker 4s ease-in-out infinite; }

        /* ── Leg walk ── */
        @keyframes legSwingL {
          0%,100%{ transform:translateY(0) rotate(-5deg); }
          50%    { transform:translateY(4px) rotate(5deg); }
        }
        @keyframes legSwingR {
          0%,100%{ transform:translateY(4px) rotate(5deg); }
          50%    { transform:translateY(0) rotate(-5deg); }
        }
        .leg-walk-l { animation: legSwingL 0.4s ease-in-out infinite; }
        .leg-walk-r { animation: legSwingR 0.4s ease-in-out infinite; }

        /* ── Walk bob (sprite Y on face div) ── */
        @keyframes walkBob {
          0%,100%{ transform:translateY(0); }
          50%    { transform:translateY(-3px); }
        }
        .walk-bob { animation: walkBob 0.4s ease-in-out infinite; }

        /* ══════════════════════════════════════
           NPC 2D PATH ANIMATIONS  (4 unique routes)
           Each path loops around the dance floor
        ══════════════════════════════════════ */

        /* Path 0 — drifts right, circles back left */
        @keyframes npcPath0 {
          0%  { transform: translate(0px,   0px);   }
          12% { transform: translate(38px,  -14px); }
          28% { transform: translate(55px,   8px);  }
          45% { transform: translate(22px,   28px); }
          62% { transform: translate(-32px,  18px); }
          78% { transform: translate(-50px,  -6px); }
          90% { transform: translate(-18px, -22px); }
          100%{ transform: translate(0px,   0px);   }
        }
        .npc-path-0 { animation-name: npcPath0; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-duration: 8s; }

        /* Face 0 — right 0–28%, left 28–78%, right 78–100% */
        @keyframes npcFace0 {
          0%  { transform: scaleX(1); }  27% { transform: scaleX(1); }
          28% { transform: scaleX(-1); } 77% { transform: scaleX(-1); }
          78% { transform: scaleX(1); }  100%{ transform: scaleX(1); }
        }
        .npc-face-0 { animation-name: npcFace0; animation-timing-function: step-start; animation-iteration-count: infinite; animation-duration: 8s; }

        /* Path 1 — starts left, sweeps right */
        @keyframes npcPath1 {
          0%  { transform: translate(0px,   0px);   }
          18% { transform: translate(-48px,  12px); }
          35% { transform: translate(-28px,  32px); }
          55% { transform: translate(32px,   22px); }
          72% { transform: translate(52px,   -4px); }
          88% { transform: translate(20px,  -18px); }
          100%{ transform: translate(0px,   0px);   }
        }
        .npc-path-1 { animation-name: npcPath1; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-duration: 10s; }

        /* Face 1 — left 0–18%, right 18–72%, left 72–100% */
        @keyframes npcFace1 {
          0%  { transform: scaleX(-1); } 17% { transform: scaleX(-1); }
          18% { transform: scaleX(1); }  71% { transform: scaleX(1); }
          72% { transform: scaleX(-1); } 100%{ transform: scaleX(-1); }
        }
        .npc-face-1 { animation-name: npcFace1; animation-timing-function: step-start; animation-iteration-count: infinite; animation-duration: 10s; }

        /* Path 2 — tight wander pattern */
        @keyframes npcPath2 {
          0%  { transform: translate(0px,   0px);   }
          15% { transform: translate(28px,   22px); }
          32% { transform: translate(46px,   -8px); }
          50% { transform: translate(15px,  -24px); }
          65% { transform: translate(-28px, -12px); }
          80% { transform: translate(-44px,  16px); }
          92% { transform: translate(-12px,  28px); }
          100%{ transform: translate(0px,   0px);   }
        }
        .npc-path-2 { animation-name: npcPath2; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-duration: 7s; }

        /* Face 2 — right 0–32%, left 32–80%, right 80–100% */
        @keyframes npcFace2 {
          0%  { transform: scaleX(1); }  31% { transform: scaleX(1); }
          32% { transform: scaleX(-1); } 79% { transform: scaleX(-1); }
          80% { transform: scaleX(1); }  100%{ transform: scaleX(1); }
        }
        .npc-face-2 { animation-name: npcFace2; animation-timing-function: step-start; animation-iteration-count: infinite; animation-duration: 7s; }

        /* Path 3 — pole area dance route */
        @keyframes npcPath3 {
          0%  { transform: translate(0px,   0px);   }
          20% { transform: translate(-26px, -16px); }
          38% { transform: translate(-18px,  24px); }
          56% { transform: translate(24px,   28px); }
          74% { transform: translate(40px,  -12px); }
          90% { transform: translate(10px,  -26px); }
          100%{ transform: translate(0px,   0px);   }
        }
        .npc-path-3 { animation-name: npcPath3; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-duration: 9s; }

        /* Face 3 — left 0–20%, right 20–74%, left 74–100% */
        @keyframes npcFace3 {
          0%  { transform: scaleX(-1); } 19% { transform: scaleX(-1); }
          20% { transform: scaleX(1); }  73% { transform: scaleX(1); }
          74% { transform: scaleX(-1); } 100%{ transform: scaleX(-1); }
        }
        .npc-face-3 { animation-name: npcFace3; animation-timing-function: step-start; animation-iteration-count: infinite; animation-duration: 9s; }

        /* ── Dialogue UI ── */
        @keyframes speakingDots {
          0%,100%{ opacity:1; letter-spacing:0.1em; }
          50%    { opacity:0.4; letter-spacing:0.3em; }
        }
        .speaking-dots { animation: speakingDots 0.8s ease-in-out infinite; }

        @keyframes clueFlashIn {
          from{ opacity:0; transform:translateY(-6px); }
          to  { opacity:1; transform:translateY(0); }
        }
        .clue-flash { animation: clueFlashIn 0.3s ease-out; }

        .choice-btn:hover { background:#260050 !important; border-color:${`#c470f8`} !important; color:#fff !important; }
        .guess-btn:hover  { filter:brightness(1.25); transform:scale(1.02); }

        /* ── Typewriter cursor ── */
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        .type-cursor { animation: cursorBlink 0.55s step-start infinite; font-weight: bold; margin-left: 1px; }

        /* ── Victory / Loss screen ── */
        @keyframes resultScreenEnter {
          from { opacity:0; transform:scale(0.92); }
          to   { opacity:1; transform:scale(1); }
        }
        .result-screen-enter { animation: resultScreenEnter 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes resultIconPop {
          0%  { transform:scale(0) rotate(-20deg); opacity:0; }
          60% { transform:scale(1.25) rotate(6deg); opacity:1; }
          100%{ transform:scale(1) rotate(0deg); }
        }
        .result-icon-pop { animation: resultIconPop 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both; }

        @keyframes resultTitleFlash {
          0%  { opacity:0; letter-spacing:0.6em; }
          60% { opacity:1; letter-spacing:0.28em; }
          100%{ letter-spacing:0.25em; }
        }
        .result-title-flash { animation: resultTitleFlash 0.5s ease-out 0.4s both; }

        @keyframes confettiFall {
          0%   { transform:translateY(0) rotate(0deg); opacity:1; }
          80%  { opacity:1; }
          100% { transform:translateY(110vh) rotate(540deg); opacity:0; }
        }
        .confetti-particle { animation: confettiFall 2.4s ease-in infinite; }

        /* ── Responsive dialogue ── */
        @media (max-width: 600px) {
          .dialogue-content   { flex-direction: column !important; }
          .portrait-panel     { width: 100% !important; flex-direction: row !important; padding: 12px 16px !important; border-right: none !important; border-bottom: 2px solid rgba(255,255,255,0.1); gap: 12px !important; justify-content: flex-start !important; }
          .speech-panel       { padding: 14px !important; }
        }
      `}</style>
    </div>
  );
}
