"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const stores = [
  { id: "playboy",   label: "PLAYBOY",       floor: 3, x: 33, y: 20, color: "#FF69B4", glow: "#FF1493" },
  { id: "obsession", label: "OBSESSION",     floor: 3, x: 66, y: 20, color: "#9B59B6", glow: "#C060FF" },
  { id: "spectrum",  label: "SPECTRUM",      floor: 2, x: 18, y: 50, color: "#00BFFF", glow: "#0099FF" },
  { id: "dollhouse", label: "THE DOLLHOUSE", floor: 2, x: 60, y: 50, color: "#FF5500", glow: "#FF7733" },
  { id: "candybar",  label: "CANDY BAR",     floor: 1, x: 22, y: 78, color: "#FFD700", glow: "#FFAA00" },
  { id: "rainbow",   label: "RAINBOW",       floor: 1, x: 50, y: 78, color: "#7FFF00", glow: "#44CC00" },
];

const sideActions = [
  { num: "1", label: "SELECT\nGOGO",     color: "#FF69B4" },
  { num: "2", label: "PLAY\nMINIGAME",  color: "#00BFFF" },
  { num: "3", label: "DRINK\nMENU",     color: "#FFD700" },
  { num: "4", label: "MUSIC\nCHANNELS", color: "#7FFF00" },
];

/* ── Pixel-art walking character ─────────────────── */
function PixelWalker({ color = "#FFE44D" }: { color?: string }) {
  return (
    <div className="pixel-walker" style={{ position: "relative", width: "28px", height: "44px", imageRendering: "pixelated" }}>
      {/* Head */}
      <div style={{ position: "absolute", top: 0, left: "6px", width: "16px", height: "16px", background: "#FFDBA0", border: "2px solid #AA6622", boxShadow: `0 0 6px ${color}` }} />
      {/* Body */}
      <div style={{ position: "absolute", top: "14px", left: "4px", width: "20px", height: "14px", background: color, border: "2px solid #00000088" }} />
      {/* Left arm */}
      <div className="arm-l" style={{ position: "absolute", top: "16px", left: "-2px", width: "6px", height: "10px", background: color, transformOrigin: "top center" }} />
      {/* Right arm */}
      <div className="arm-r" style={{ position: "absolute", top: "16px", right: "-2px", width: "6px", height: "10px", background: color, transformOrigin: "top center" }} />
      {/* Left leg */}
      <div className="leg-l" style={{ position: "absolute", top: "26px", left: "4px", width: "8px", height: "18px", background: "#334488", border: "1px solid #00000044", transformOrigin: "top center" }} />
      {/* Right leg */}
      <div className="leg-r" style={{ position: "absolute", top: "26px", right: "4px", width: "8px", height: "18px", background: "#334488", border: "1px solid #00000044", transformOrigin: "top center" }} />
    </div>
  );
}

export default function GamePage() {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");
  const [targetColor, setTargetColor] = useState("#FF69B4");

  const handleStoreClick = (store: typeof stores[0]) => {
    if (navigating) return;
    setTargetLabel(store.label);
    setTargetColor(store.color);
    setNavigating(true);
    setTimeout(() => {
      router.push(`/game/${store.id}`);
    }, 2200);
  };

  return (
    <>
      <div
        className="relative w-screen h-screen overflow-hidden select-none"
        style={{ fontFamily: "'Press Start 2P', 'Courier New', monospace" }}
      >
        {/* ── BACKGROUND ─────────────────────────── */}
        <div className="absolute inset-0 z-0">
          <Image src="/alley-bg.png" alt="alley bg" fill className="object-cover pixelated" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="grid-pan absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(180,0,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(180,0,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="orb absolute rounded-full pointer-events-none"
              style={{
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                left: `${(i * 83 + 7) % 92}%`,
                top: `${(i * 61 + 13) % 80}%`,
                background: ["#FF69B4", "#9B59B6", "#00BFFF", "#FFD700", "#7FFF00"][i % 5],
                boxShadow: `0 0 8px 3px ${["#FF69B4", "#9B59B6", "#00BFFF", "#FFD700", "#7FFF00"][i % 5]}`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* ── TOP BAR ────────────────────────────── */}
        <div className="relative z-10 flex items-stretch h-10">
          <a
            href="/wardrobe"
            className="flex items-center px-3 hover:brightness-125 transition-all"
            style={{ background: "linear-gradient(135deg, #1a0040, #2d0060)", border: "2px solid #9B59B6", borderRight: "none" }}
          >
            <span style={{ color: "#FFE44D", fontSize: "9px", textShadow: "0 0 6px #FFB800", letterSpacing: "0.1em" }}>
              NANA<br />PLAZA
            </span>
          </a>
          <div
            className="flex-1 flex items-center justify-center"
            style={{ background: "linear-gradient(90deg, #1a0040, #2d0060, #1a0040)", border: "2px solid #9B59B6", borderLeft: "none", borderRight: "none" }}
          >
            <span style={{ color: "#E8B0FF", fontSize: "13px", letterSpacing: "0.25em", textShadow: "0 0 10px #C060FF, 0 0 20px #9B59B6" }}>
              GOGO STORE SELECT
            </span>
          </div>
          <div style={{ width: "60px", background: "linear-gradient(135deg, #1a0040, #2d0060)", border: "2px solid #9B59B6", borderLeft: "none" }} />
        </div>

        {/* ── MAIN AREA ──────────────────────────── */}
        <div className="relative z-10 flex h-[calc(100%-80px)]">
          <div className="relative flex-1">

            {/* ── FLOOR SEPARATORS ─────────────────── */}
            {/* Floor 3 label */}
            <div className="absolute z-10 flex items-center gap-2" style={{ top: "33%", left: 0, right: "70px", transform: "translateY(-50%)" }}>
              <span style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.2em", textShadow: "0 0 6px #9B59B6", minWidth: "22px", paddingLeft: "6px" }}>2F</span>
              <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg, #9B59B666, #9B59B622)", borderTop: "1px solid #9B59B644" }} />
            </div>
            {/* Floor 2 label */}
            <div className="absolute z-10 flex items-center gap-2" style={{ top: "64%", left: 0, right: "70px", transform: "translateY(-50%)" }}>
              <span style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.2em", textShadow: "0 0 6px #9B59B6", minWidth: "22px", paddingLeft: "6px" }}>1F</span>
              <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg, #9B59B666, #9B59B622)", borderTop: "1px solid #9B59B644" }} />
            </div>

            {/* Floor labels on right edge */}
            <div className="absolute right-2 z-10" style={{ top: "10%", fontSize: "7px", color: "#C060FF88", letterSpacing: "0.1em" }}>3F</div>
            <div className="absolute right-2 z-10" style={{ top: "41%", fontSize: "7px", color: "#C060FF88", letterSpacing: "0.1em" }}>2F</div>
            <div className="absolute right-2 z-10" style={{ top: "68%", fontSize: "7px", color: "#C060FF88", letterSpacing: "0.1em" }}>1F</div>

            {/* ── STORE BUILDINGS ──────────────────── */}
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreClick(store)}
                className="store-node absolute group"
                style={{
                  left: `${store.x}%`,
                  top: `${store.y}%`,
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  ["--c" as string]: store.color,
                  ["--g" as string]: store.glow,
                }}
              >
                {/* Rooftop */}
                <div style={{ width: "96px", height: "6px", background: store.color, boxShadow: `0 0 10px ${store.glow}, 0 0 20px ${store.color}88` }} />
                {/* Sign */}
                <div className="store-sign" style={{ width: "96px", padding: "4px 2px", textAlign: "center", background: `linear-gradient(180deg, ${store.color}44, ${store.color}11)`, border: `2px solid ${store.color}`, borderTop: "none", borderBottom: "none", boxShadow: `inset 0 0 10px ${store.color}22` }}>
                  <span style={{ color: store.color, fontSize: "5px", letterSpacing: "0.06em", textShadow: `0 0 6px ${store.glow}, 0 0 14px ${store.color}`, display: "block", whiteSpace: "nowrap" }}>
                    {store.label}
                  </span>
                </div>
                {/* Body */}
                <div className="store-body" style={{ width: "96px", height: "64px", background: `linear-gradient(180deg, #0e0625, #07020f)`, border: `2px solid ${store.color}`, borderTop: "none", boxShadow: `0 0 14px ${store.glow}55, inset 0 0 20px rgba(0,0,0,0.9)`, position: "relative" }}>
                  {/* Left window */}
                  <div style={{ position: "absolute", top: "8px", left: "10px", width: "20px", height: "24px", background: `${store.color}18`, border: `1px solid ${store.color}66`, boxShadow: `inset 0 0 8px ${store.color}44` }}>
                    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "8px", height: "16px", background: `${store.color}99`, borderRadius: "3px 3px 0 0" }} />
                    <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", width: "6px", height: "6px", background: `${store.color}cc`, borderRadius: "50%" }} />
                  </div>
                  {/* Right window */}
                  <div style={{ position: "absolute", top: "8px", right: "10px", width: "20px", height: "24px", background: `${store.color}18`, border: `1px solid ${store.color}66`, boxShadow: `inset 0 0 8px ${store.color}44` }}>
                    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "8px", height: "16px", background: `${store.color}99`, borderRadius: "3px 3px 0 0" }} />
                    <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", width: "6px", height: "6px", background: `${store.color}cc`, borderRadius: "50%" }} />
                  </div>
                  {/* Door */}
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "22px", height: "28px", background: `${store.color}11`, border: `1px solid ${store.color}88`, borderBottom: "none", borderRadius: "2px 2px 0 0", boxShadow: `inset 0 0 6px ${store.color}33` }} />
                  {/* Bottom neon strip */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: store.color, boxShadow: `0 0 8px ${store.glow}`, opacity: 0.8 }} />
                </div>
                {/* Ground glow */}
                <div style={{ width: "100px", height: "8px", background: `radial-gradient(ellipse, ${store.color}66, transparent 70%)`, marginLeft: "-2px" }} />
              </button>
            ))}

            {/* Road lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              <line x1="33%" y1="20%" x2="66%" y2="20%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="33%" y1="20%" x2="18%" y2="50%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="66%" y1="20%" x2="60%" y2="50%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="18%" y1="50%" x2="22%" y2="78%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="22%" y1="78%" x2="50%" y2="78%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="60%" y1="50%" x2="50%" y2="78%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="18%" y1="50%" x2="60%" y2="50%" stroke="#9B59B6" strokeWidth="2" strokeDasharray="6,4" />
            </svg>
          </div>

          {/* ── SIDEBAR ──────────────────────────── */}
          <div className="flex flex-col gap-2 p-2 justify-center" style={{ width: "70px", background: "linear-gradient(180deg, #0d0020, #1a0040)", borderLeft: "2px solid #9B59B6" }}>
            {sideActions.map((action) => (
              <button key={action.num} className="flex flex-col items-center gap-1 p-2 transition-all hover:brightness-125 active:scale-95" style={{ background: "linear-gradient(160deg, #1a0040, #0d0020)", border: `2px solid ${action.color}`, boxShadow: `0 0 8px ${action.color}44` }}>
                <span style={{ color: action.color, fontSize: "14px", fontWeight: "900", textShadow: `0 0 8px ${action.color}` }}>{action.num}</span>
                <span className="text-center leading-tight whitespace-pre-line" style={{ color: "#C8A8E0", fontSize: "6px", letterSpacing: "0.05em" }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────── */}
        <div className="relative z-10 h-10 flex items-center justify-center" style={{ background: "linear-gradient(90deg, #0d0020, #1a0040, #0d0020)", borderTop: "2px solid #9B59B6" }}>
          <span style={{ color: "#9B59B6", fontSize: "8px", letterSpacing: "0.3em", textShadow: "0 0 6px #9B59B6" }}>
            AGOGO ADVENTURE: THE GOLDEN ERA
          </span>
        </div>
      </div>

      {/* ── WALKING TRANSITION OVERLAY ─────────────── */}
      {navigating && (
        <div className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center overflow-hidden">
          {/* Top text */}
          <div className="flicker mb-2" style={{ color: "#888", fontSize: "7px", letterSpacing: "0.3em" }}>
            NOW ENTERING
          </div>
          <div className="flicker" style={{ color: targetColor, fontSize: "11px", letterSpacing: "0.25em", textShadow: `0 0 12px ${targetColor}, 0 0 24px ${targetColor}`, marginBottom: "48px" }}>
            {targetLabel}
          </div>

          {/* Stair scene */}
          <div style={{ position: "relative", width: "100vw", height: "180px", overflow: "hidden" }}>
            {/* Stair steps — 9 steps rising from left to right */}
            {[...Array(9)].map((_, i) => (
              <div key={i}>
                {/* Horizontal tread */}
                <div style={{
                  position: "absolute",
                  bottom: `${14 + i * 18}px`,
                  left: `${6 + i * 10}%`,
                  width: "11%",
                  height: "18px",
                  background: "linear-gradient(180deg, #4a4a5a, #2e2e3a)",
                  border: "1px solid #5a5a6a",
                  borderBottom: "3px solid #1a1a22",
                  boxShadow: `0 3px 0 #111, 0 0 6px ${targetColor}22`,
                  imageRendering: "pixelated",
                }} />
                {/* Vertical riser */}
                <div style={{
                  position: "absolute",
                  bottom: `${14 + i * 18}px`,
                  left: `${6 + i * 10}%`,
                  width: "3px",
                  height: `${18 * (i + 1)}px`,
                  background: "#222230",
                  transform: "translateY(100%)",
                }} />
                {/* Glow dot on step edge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: `${31 + i * 18}px`,
                    left: `${6 + i * 10}%`,
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: targetColor,
                    boxShadow: `0 0 6px ${targetColor}`,
                    opacity: 0.8,
                    animation: `dotEat 0.22s linear ${i * 0.22}s forwards`,
                  }}
                />
              </div>
            ))}

            {/* Walking character climbing stairs */}
            <div className="walker-stairs" style={{ position: "absolute" }}>
              <PixelWalker color={targetColor} />
            </div>
          </div>

          {/* Bottom hint */}
          <div style={{ marginTop: "32px", color: "#444", fontSize: "7px", letterSpacing: "0.3em" }}>
            ▶ ▶ ▶
          </div>
        </div>
      )}

      {/* ── GLOBAL STYLES ──────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }

        @keyframes gridPan {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .grid-pan { animation: gridPan 4s linear infinite; }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1);    opacity: 0.6; }
          50%       { transform: translateY(-16px) scale(1.2); opacity: 1; }
        }
        .orb { animation: orbFloat 3s ease-in-out infinite; }

        /* Store float */
        @keyframes storeFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-5px); }
        }
        .store-node {
          animation: storeFloat 2.8s ease-in-out infinite;
        }
        .store-node:nth-child(3) { animation-delay: 0s; }
        .store-node:nth-child(4) { animation-delay: 0.45s; }
        .store-node:nth-child(5) { animation-delay: 0.9s; }
        .store-node:nth-child(6) { animation-delay: 1.35s; }
        .store-node:nth-child(7) { animation-delay: 1.8s; }
        .store-node:nth-child(8) { animation-delay: 2.25s; }

        .store-node:hover .store-sign { filter: brightness(1.5) saturate(1.3); }
        .store-node:hover .store-body {
          filter: brightness(1.5) saturate(1.3);
          box-shadow: 0 0 30px var(--g), 0 0 60px var(--c), inset 0 0 20px rgba(0,0,0,0.5) !important;
        }

        /* ── Stair climbing transition ─────────── */
        @keyframes walkStairs {
          0%   { bottom: 32px;  left: 4%; }
          11%  { bottom: 50px;  left: 14%; }
          22%  { bottom: 68px;  left: 24%; }
          33%  { bottom: 86px;  left: 34%; }
          44%  { bottom: 104px; left: 44%; }
          55%  { bottom: 122px; left: 54%; }
          66%  { bottom: 140px; left: 64%; }
          77%  { bottom: 158px; left: 74%; }
          88%  { bottom: 176px; left: 84%; }
          100% { bottom: 194px; left: 110%; }
        }
        .walker-stairs {
          animation: walkStairs 2.2s linear forwards;
        }

        /* Leg swing */
        @keyframes legL {
          0%, 100% { transform: rotate(30deg); }
          50%       { transform: rotate(-30deg); }
        }
        @keyframes legR {
          0%, 100% { transform: rotate(-30deg); }
          50%       { transform: rotate(30deg); }
        }
        @keyframes armL {
          0%, 100% { transform: rotate(-25deg); }
          50%       { transform: rotate(25deg); }
        }
        @keyframes armR {
          0%, 100% { transform: rotate(25deg); }
          50%       { transform: rotate(-25deg); }
        }
        @keyframes bodyBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .pixel-walker { animation: bodyBob 0.22s ease-in-out infinite; }
        .leg-l  { animation: legL  0.22s ease-in-out infinite; }
        .leg-r  { animation: legR  0.22s ease-in-out infinite; }
        .arm-l  { animation: armL  0.22s ease-in-out infinite; }
        .arm-r  { animation: armR  0.22s ease-in-out infinite; }

        /* Dots eaten by walker */
        @keyframes dotEat {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(0); }
        }

        /* Flicker text */
        @keyframes flicker {
          0%, 92%, 96%, 100% { opacity: 1; }
          94%, 98%            { opacity: 0.3; }
        }
        .flicker { animation: flicker 1.5s ease-in-out infinite; }
      `}</style>
    </>
  );
}