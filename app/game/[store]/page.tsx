"use client";
import { use, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "../../context/GameContext";
import { storeNPCs, NPC } from "../npcData";

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

// ── Large NPC portrait for dialogue ─────────────────────
function NPCPortrait({ npc, speaking }: { npc: NPC; speaking: boolean }) {
  return (
    <div className="npc-portrait-bob" style={{ position: "relative", width: 96, margin: "0 auto" }}>
      {/* hair */}
      <div style={{
        position: "absolute", top: -14, left: -8, width: 112, height: 38,
        background: npc.hairColor, border: "4px solid #000", borderBottom: "none",
        boxShadow: `0 -4px 12px ${npc.outfitColor}44`,
      }} />
      {/* head */}
      <div style={{ width: 96, height: 96, background: "#F5C5A0", border: "4px solid #000", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* eyes */}
        <div style={{ position: "absolute", top: 28, left: 16, width: 12, height: 12, background: "#000" }} />
        <div style={{ position: "absolute", top: 28, right: 16, width: 12, height: 12, background: "#000" }} />
        {/* eye shine */}
        <div style={{ position: "absolute", top: 30, left: 18, width: 4, height: 4, background: "#fff" }} />
        <div style={{ position: "absolute", top: 30, right: 18, width: 4, height: 4, background: "#fff" }} />
        {/* blush */}
        <div style={{ position: "absolute", top: 48, left: 8, width: 20, height: 10, background: "#FFB0A0", borderRadius: "50%", opacity: 0.65 }} />
        <div style={{ position: "absolute", top: 48, right: 8, width: 20, height: 10, background: "#FFB0A0", borderRadius: "50%", opacity: 0.65 }} />
        {/* mouth — open when speaking */}
        {speaking ? (
          <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", width: 22, height: 10, background: "#a04040", border: "2px solid #000", borderRadius: "0 0 10px 10px" }}>
            <div style={{ position: "absolute", top: 1, left: 2, right: 2, height: 3, background: "#e06060", borderRadius: "2px" }} />
          </div>
        ) : (
          <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", width: 22, height: 6, background: "#c0605a", borderRadius: "3px" }} />
        )}
      </div>
      {/* body */}
      <div style={{
        width: 96, height: 80, background: npc.outfitColor, border: "4px solid #000", margin: "0 auto",
        position: "relative", boxShadow: `0 4px 12px ${npc.outfitColor}66`,
      }}>
        {/* outfit detail */}
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 24, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 16, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
      </div>
    </div>
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
    // Outer: XY path
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
        {/* Face direction div */}
        <div
          className={walking ? `npc-face-${pathIdx}` : "pixel-bob"}
          style={{
            filter: active ? `drop-shadow(0 0 12px ${npc.outfitColor})` : "none",
            ...(walking ? { animationDelay: offset } : {}),
          }}
        >
          {/* Walk bob wrapper */}
          <div className={walking ? "walk-bob" : ""} style={{ position: "relative" }}>
            {/* head */}
            <div style={{ width: 20, height: 20, background: "#F5C5A0", border: "2px solid #000", margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", top: 6, left: 4, width: 3, height: 3, background: "#000" }} />
              <div style={{ position: "absolute", top: 6, right: 4, width: 3, height: 3, background: "#000" }} />
              <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 6, height: 2, background: "#c0605a" }} />
            </div>
            {/* hair */}
            <div style={{ position: "absolute", top: -6, left: -2, width: 24, height: 10, background: npc.hairColor, border: "2px solid #000", borderBottom: "none" }} />
            {/* body */}
            <div style={{ width: 24, height: 30, background: npc.outfitColor, border: "2px solid #000", margin: "0 auto" }} />
            {/* legs */}
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              <div className={walking ? "leg-walk-l" : ""} style={{ width: 8, height: 14, background: npc.outfitColor, border: "2px solid #000", transformOrigin: "top center" }} />
              <div className={walking ? "leg-walk-r" : ""} style={{ width: 8, height: 14, background: npc.outfitColor, border: "2px solid #000", transformOrigin: "top center" }} />
            </div>
            {/* TALK hint */}
            {!done && !active && (
              <div className="talk-bounce absolute -top-6 left-1/2 -translate-x-1/2" style={{ fontSize: "8px", color: "#FFE44D", whiteSpace: "nowrap", textShadow: "0 0 4px #FFB800" }}>
                TALK
              </div>
            )}
          </div>
        </div>
        {/* Name outside the flip div */}
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

// ── Main page ────────────────────────────────────────────
type Phase = "browse" | "talking" | "guess" | "reveal" | "complete";

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
    setPhase("reveal");
  }

  function continueAfterReveal() {
    const newDoneSize = doneNPCs.size + 1;
    // revealCorrect and hearts are both stale closures here (their setters were
    // called in handleGuess but not yet applied), so derive the effective values.
    const effectiveHearts = revealCorrect ? hearts : hearts - 1;
    setDoneNPCs(prev => new Set([...prev, npcIndex]));
    if (newDoneSize >= npcs.length || effectiveHearts <= 0) setPhase("complete");
    else { setPhase("browse"); setLatestClue(null); setClues([]); setHintClosed(false); }
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
                  if (phase === "browse" && !doneNPCs.has(i)) { setHintClosed(true); startTalking(i); }
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
                  <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 120, height: 120, background: `radial-gradient(circle, ${currentNPC.outfitColor}22 0%, transparent 70%)`, pointerEvents: "none" }} />

                  <NPCPortrait npc={currentNPC} speaking={phase === "talking"} />

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
                      {/* Speech bubble */}
                      <div style={{
                        flex: 1,
                        padding: "18px 20px",
                        background: "rgba(255,255,255,0.04)",
                        border: `2px solid ${currentNPC.outfitColor}44`,
                        borderLeft: `4px solid ${currentNPC.outfitColor}`,
                        position: "relative",
                      }}>
                        {/* quotation mark decoration */}
                        <div style={{ position: "absolute", top: 8, left: 14, fontSize: "28px", color: `${currentNPC.outfitColor}33`, lineHeight: 1, pointerEvents: "none", fontFamily: "serif" }}>"</div>
                        <p style={{ color: "#EEE0FF", fontSize: "14px", lineHeight: 2.0, fontFamily: "sans-serif", paddingLeft: 20, paddingTop: 8, paddingRight: 8 }}>
                          {currentTurn.npcLine}
                        </p>
                      </div>

                      {/* Player choices */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <p style={{ color: "#9B59B6", fontSize: "8px", letterSpacing: "0.15em" }}>YOUR RESPONSE:</p>
                        {currentTurn.choices.map((c, i) => (
                          <button key={i} onClick={() => handleChoice(c.clue)}
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
                    </>
                  )}

                  {/* ── GUESS phase ── */}
                  {phase === "guess" && (
                    <>
                      <div style={{ padding: "18px 20px", background: "rgba(255,200,0,0.05)", border: "2px solid #FFE44D44", borderLeft: "4px solid #FFE44D" }}>
                        <p style={{ color: "#FFE44D", fontSize: "11px", letterSpacing: "0.12em", marginBottom: 10, textShadow: "0 0 6px #FFB800" }}>
                          🤔 TIME TO DECIDE
                        </p>
                        <p style={{ color: "#EEE0FF", fontSize: "15px", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                          After spending time with <span style={{ color: "#FFE44D" }}>{currentNPC.name}</span>, what&apos;s your read?
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                        <button onClick={() => handleGuess(false)}
                          className="guess-btn"
                          style={{ flex: 1, padding: "20px 12px", background: "#112211", border: "3px solid #4CAF50", color: "#6FE87A", fontSize: "13px", fontFamily: "'Press Start 2P',monospace", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 16px #4CAF5033", lineHeight: 1.6 }}>
                          👧<br />REAL GIRL
                        </button>
                        <button onClick={() => handleGuess(true)}
                          className="guess-btn"
                          style={{ flex: 1, padding: "20px 12px", background: "#221128", border: "3px solid #FF69B4", color: "#FF9ECC", fontSize: "13px", fontFamily: "'Press Start 2P',monospace", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 16px #FF69B433", lineHeight: 1.6 }}>
                          💅<br />LADYBOY
                        </button>
                      </div>
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

        {/* ── Complete overlay ── */}
        {phase === "complete" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
            <div style={{ width: "min(400px,90vw)", padding: "28px", background: "#0a0018", border: `4px solid ${meta.color}`, boxShadow: `0 0 30px ${meta.glow}66`, display: "flex", flexDirection: "column", gap: 14 }}>
              <p className="text-center" style={{ color: meta.color, fontSize: "15px", textShadow: `0 0 12px ${meta.glow}`, letterSpacing: "0.2em" }}>{meta.label} COMPLETE</p>
              <p className="text-center" style={{ color: "#FFE44D", fontSize: "26px", textShadow: "0 0 10px #FFB800" }}>{score}/{npcs.length}</p>
              <div>{results.map((r, i) => <p key={i} style={{ fontSize: "9px", color: r.correct ? "#6FE87A" : "#FF6666", marginBottom: 4 }}>{r.correct ? "✓" : "✗"} {r.name.toUpperCase()}</p>)}</div>
              <p style={{ color: "#C8A8E0", fontSize: "8px", textAlign: "center", letterSpacing: "0.1em" }}>
                {score === npcs.length ? "PERFECT SCORE — SHARP INSTINCTS!" : score >= 2 ? "GOOD READ — ALMOST GOT IT!" : "NEEDS WORK — LISTEN MORE CAREFULLY"}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/game" style={{ flex: 1, padding: "10px", textAlign: "center", background: "#0d0020", border: `2px solid ${meta.color}`, color: meta.color, fontSize: "8px", letterSpacing: "0.1em", textDecoration: "none", fontFamily: "'Press Start 2P',monospace" }}>◀ MAP</Link>
                <button onClick={() => { setPhase("browse"); setScore(0); setHearts(3); setResults([]); setDoneNPCs(new Set()); setNpcIndex(0); setTurnIndex(0); setClues([]); setLatestClue(null); setHintClosed(false); setDialogueClosed(false); }}
                  style={{ flex: 1, padding: "10px", background: "#1a0040", border: "2px solid #FFE44D", color: "#FFE44D", fontSize: "8px", letterSpacing: "0.1em", cursor: "pointer", fontFamily: "'Press Start 2P',monospace" }}>
                  ↺ RETRY
                </button>
              </div>
            </div>
          </div>
        )}
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
