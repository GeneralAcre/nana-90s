"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ── Theme palette ─────────────────────────────────── */
const P = {
  deepPurple: "#4A043A",
  darkRed:    "#A10535",
  gold:       "#FAC335",
  brightRed:  "#DD192F",
  darkMauve:  "#482D40",
};

/* ── Store data ──────────────────────────────────────
   Each store has a unique icon (emoji/unicode that
   renders in pixel font) and a palette color.          */
const stores = [
  {
    id:      "playboy",
    label:   "PLAYBOY",
    floor:   3,
    x: 28, y: 46,
    color:   P.brightRed,
    glow:    "#FF4455",
    icon:    "♠",
    sub:     "VIP LOUNGE",
  },
  {
    id:      "obsession",
    label:   "OBSESSION",
    floor:   3,
    x: 72, y: 46,
    color:   P.darkRed,
    glow:    "#CC1144",
    icon:    "♥",
    sub:     "NIGHT CLUB",
  },
  {
    id:      "spectrum",
    label:   "SPECTRUM",
    floor:   2,
    x: 28, y: 46,
    color:   P.gold,
    glow:    "#FFB800",
    icon:    "★",
    sub:     "GO-GO BAR",
  },
  {
    id:      "dollhouse",
    label:   "DOLLHOUSE",
    floor:   2,
    x: 72, y: 46,
    color:   P.darkMauve,
    glow:    "#8B4060",
    icon:    "♦",
    sub:     "GENTLEMAN CLUB",
  },
  {
    id:      "candybar",
    label:   "CANDY BAR",
    floor:   1,
    x: 28, y: 46,
    color:   P.gold,
    glow:    "#FFCC00",
    icon:    "◆",
    sub:     "OPEN BAR",
  },
  {
    id:      "rainbow",
    label:   "RAINBOW",
    floor:   1,
    x: 72, y: 46,
    color:   P.brightRed,
    glow:    "#FF3355",
    icon:    "❋",
    sub:     "DANCE FLOOR",
  },
];

const floors = [
  { num: 3, label: "3RD FLOOR" },
  { num: 2, label: "2ND FLOOR" },
  { num: 1, label: "1ST FLOOR" },
];

/* ── Pixel-art walking character ─────────────────── */
function PixelWalker({ color = P.gold }: { color?: string }) {
  return (
    <div className="pixel-walker" style={{ position: "relative", width: "28px", height: "44px", imageRendering: "pixelated" }}>
      <div style={{ position: "absolute", top: 0, left: "6px", width: "16px", height: "16px", background: "#FFDBA0", border: "2px solid #AA6622", boxShadow: `0 0 6px ${color}` }} />
      <div style={{ position: "absolute", top: "14px", left: "4px", width: "20px", height: "14px", background: color, border: "2px solid #00000088" }} />
      <div className="arm-l" style={{ position: "absolute", top: "16px", left: "-2px", width: "6px", height: "10px", background: color, transformOrigin: "top center" }} />
      <div className="arm-r" style={{ position: "absolute", top: "16px", right: "-2px", width: "6px", height: "10px", background: color, transformOrigin: "top center" }} />
      <div className="leg-l" style={{ position: "absolute", top: "26px", left: "4px", width: "8px", height: "18px", background: P.deepPurple, border: "1px solid #00000044", transformOrigin: "top center" }} />
      <div className="leg-r" style={{ position: "absolute", top: "26px", right: "4px", width: "8px", height: "18px", background: P.deepPurple, border: "1px solid #00000044", transformOrigin: "top center" }} />
    </div>
  );
}

/* ── Store card ──────────────────────────────────── */
function StoreCard({ store, onClick }: { store: typeof stores[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="store-node absolute group"
      style={{
        left:      `${store.x}%`,
        top:       `${store.y}%`,
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border:     "none",
        padding:    0,
        cursor:     "pointer",
        ["--c" as string]: store.color,
        ["--g" as string]: store.glow,
      }}
    >
      {/* Top spike decoration */}
      <div className="store-spike" style={{
        display:        "flex",
        justifyContent: "center",
        gap:            "4px",
        marginBottom:   "2px",
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width:      i === 1 ? "6px" : "4px",
            height:     i === 1 ? "10px" : "7px",
            background: store.color,
            boxShadow:  `0 0 6px ${store.glow}`,
          }} />
        ))}
      </div>

      {/* Main card */}
      <div className="store-body" style={{
        width:      "clamp(80px, 14vw, 108px)",
        background: `linear-gradient(160deg, ${store.color}18, #0a0006 60%)`,
        border:     `3px solid ${store.color}`,
        boxShadow:  `0 0 18px ${store.glow}44, inset 0 0 16px rgba(0,0,0,0.7)`,
        padding:    "10px 6px 8px",
        textAlign:  "center",
        position:   "relative",
      }}>
        {/* Corner accents */}
        <div style={{ position:"absolute", top:2, left:2,  width:6, height:6, borderTop:`2px solid ${store.color}`, borderLeft:`2px solid ${store.color}` }} />
        <div style={{ position:"absolute", top:2, right:2, width:6, height:6, borderTop:`2px solid ${store.color}`, borderRight:`2px solid ${store.color}` }} />
        <div style={{ position:"absolute", bottom:2, left:2,  width:6, height:6, borderBottom:`2px solid ${store.color}`, borderLeft:`2px solid ${store.color}` }} />
        <div style={{ position:"absolute", bottom:2, right:2, width:6, height:6, borderBottom:`2px solid ${store.color}`, borderRight:`2px solid ${store.color}` }} />

        {/* Icon */}
        <div className="store-icon" style={{
          fontSize:   "clamp(20px, 4vw, 30px)",
          lineHeight: 1,
          color:      store.color,
          textShadow: `0 0 10px ${store.glow}, 0 0 24px ${store.color}88`,
          marginBottom: "6px",
        }}>
          {store.icon}
        </div>

        {/* Name */}
        <div style={{
          fontSize:      "6px",
          color:         store.color,
          textShadow:    `0 0 8px ${store.glow}`,
          letterSpacing: "0.1em",
          marginBottom:  "3px",
          fontFamily:    "'Press Start 2P', monospace",
        }}>
          {store.label}
        </div>

        {/* Sub label */}
        <div style={{
          fontSize:      "5px",
          color:         store.color + "99",
          letterSpacing: "0.06em",
        }}>
          {store.sub}
        </div>

        {/* Bottom glow bar */}
        <div style={{
          position:   "absolute",
          bottom:     0, left: 0, right: 0,
          height:     "3px",
          background: store.color,
          boxShadow:  `0 0 8px ${store.glow}`,
          opacity:    0.9,
        }} />
      </div>

      {/* Ground shadow */}
      <div style={{
        width:      "clamp(84px, 14.5vw, 112px)",
        height:     "8px",
        background: `radial-gradient(ellipse, ${store.color}55, transparent 70%)`,
        marginLeft: "-2px",
      }} />
    </button>
  );
}

/* ── Page ────────────────────────────────────────── */
export default function GamePage() {
  const router                              = useRouter();
  const [activeFloor, setActiveFloor]       = useState(1);
  const [floorVisible, setFloorVisible]     = useState(true);
  const [navigating,   setNavigating]       = useState(false);
  const [targetLabel,  setTargetLabel]      = useState("");
  const [targetColor,  setTargetColor]      = useState(P.gold);

  const currentFloor = floors.find(f => f.num === activeFloor)!;
  const visibleStores = stores.filter(s => s.floor === activeFloor);

  const changeFloor = (num: number) => {
    if (num === activeFloor) return;
    setFloorVisible(false);
    setTimeout(() => {
      setActiveFloor(num);
      setFloorVisible(true);
    }, 220);
  };

  const handleStoreClick = (store: typeof stores[0]) => {
    if (navigating) return;
    setTargetLabel(store.label);
    setTargetColor(store.color);
    setNavigating(true);
    setTimeout(() => router.push(`/game/${store.id}`), 2200);
  };

  return (
    <>
      <div
        className="relative w-screen h-dvh overflow-hidden select-none"
        style={{ fontFamily: "'Press Start 2P', monospace", background: "#0a0006" }}
      >
        {/* ── BACKGROUND ──────────────────────────── */}
        <div className="absolute inset-0 z-0">
          <Image src="/nana-plaza.png" alt="bg" fill className="object-cover pixelated" priority />
          <div className="absolute inset-0" style={{ background: "rgba(10,0,6,0.82)" }} />
          {/* Grid overlay in theme red */}
          <div
            className="grid-pan absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${P.darkRed}99 1px, transparent 1px), linear-gradient(90deg, ${P.darkRed}99 1px, transparent 1px)`,
              backgroundSize:  "60px 60px",
            }}
          />
          {/* Floating orbs in palette colors */}
          {[P.brightRed, P.darkRed, P.gold, P.darkMauve, P.deepPurple, P.brightRed, P.gold].map((c, i) => (
            <div
              key={i}
              className="orb absolute rounded-full pointer-events-none"
              style={{
                width:            `${4 + (i % 3) * 2}px`,
                height:           `${4 + (i % 3) * 2}px`,
                left:             `${(i * 83 + 7) % 90}%`,
                top:              `${(i * 61 + 13) % 75}%`,
                background:       c,
                boxShadow:        `0 0 8px 3px ${c}`,
                animationDelay:   `${i * 0.6}s`,
                animationDuration:`${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* ── TOP BAR ──────────────────────────────── */}
        <div className="relative z-10 flex items-stretch h-10">
          {/* Logo */}
          <a
            href="/wardrobe"
            className="flex items-center px-3 hover:brightness-125 transition-all"
            style={{
              background: `linear-gradient(135deg, ${P.deepPurple}, ${P.darkMauve})`,
              border:      `2px solid ${P.darkMauve}`,
              borderRight: "none",
            }}
          >
            <span style={{ color: P.gold, fontSize: "8px", textShadow: `0 0 6px ${P.gold}`, letterSpacing: "0.1em", lineHeight: 1.3 }}>
              NANA<br />PLAZA
            </span>
          </a>

          {/* Floor title */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              background: `linear-gradient(90deg, ${P.deepPurple}, ${P.darkMauve}88, ${P.deepPurple})`,
              border:      `2px solid ${P.darkMauve}`,
              borderLeft:  "none",
              borderRight: "none",
            }}
          >
            <span className="game-select-title" style={{
              color:      P.gold,
              fontSize:   "13px",
              letterSpacing: "0.28em",
              textShadow: `0 0 10px ${P.gold}, 0 0 22px ${P.gold}66`,
              transition: "all 0.2s",
            }}>
              GOGO STORE · {currentFloor.label}
            </span>
          </div>

          {/* Spacer aligning with sidebar */}
          <div style={{
            width:      "clamp(52px, 8vw, 68px)",
            background: `linear-gradient(135deg, ${P.deepPurple}, ${P.darkMauve})`,
            border:      `2px solid ${P.darkMauve}`,
            borderLeft:  "none",
          }} />
        </div>

        {/* ── MAIN AREA ────────────────────────────── */}
        <div className="relative z-10 flex" style={{ height: "calc(100% - 80px)", minHeight: 0 }}>
          <div className="relative flex-1">

            {/* Floor label watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: 0.04 }}
            >
              <span className="floor-watermark" style={{ fontSize: "160px", color: P.gold, fontWeight: 900 }}>
                {activeFloor}F
              </span>
            </div>

            {/* Stores (fade in/out on floor change) */}
            <div
              className="absolute inset-0"
              style={{
                opacity:    floorVisible ? 1 : 0,
                transition: "opacity 0.22s ease",
              }}
            >
              {visibleStores.map(store => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onClick={() => handleStoreClick(store)}
                />
              ))}
            </div>

            {/* Connecting dashed lines between stores on this floor */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: floorVisible ? 0.35 : 0, transition: "opacity 0.22s ease" }}
            >
              {visibleStores.length === 2 && (
                <line
                  x1={`${visibleStores[0].x}%`} y1={`${visibleStores[0].y}%`}
                  x2={`${visibleStores[1].x}%`} y2={`${visibleStores[1].y}%`}
                  stroke={P.darkRed}
                  strokeWidth="2"
                  strokeDasharray="6,5"
                />
              )}
            </svg>
          </div>

          {/* ── SIDEBAR — Floor selector ─────────── */}
          <div
            className="flex flex-col items-center justify-center gap-2 py-4"
            style={{
              width:       "68px",
              background:  `linear-gradient(180deg, ${P.deepPurple}, ${P.darkMauve}88)`,
              borderLeft:  `2px solid ${P.darkMauve}`,
            }}
          >
            <span style={{ fontSize: "6px", color: P.darkRed + "aa", letterSpacing: "0.1em", marginBottom: "4px" }}>FLOOR</span>

            {floors.map(f => {
              const isActive = f.num === activeFloor;
              return (
                <button
                  key={f.num}
                  onClick={() => changeFloor(f.num)}
                  className="transition-all duration-150 hover:brightness-125 active:scale-95"
                  style={{
                    width:      "clamp(38px, 6vw, 48px)",
                    padding:    "8px 4px",
                    textAlign:  "center",
                    background: isActive
                      ? `linear-gradient(180deg, ${P.darkRed}, ${P.deepPurple})`
                      : `linear-gradient(180deg, ${P.deepPurple}, #0a0006)`,
                    border:     `2px solid ${isActive ? P.gold : P.darkMauve}`,
                    boxShadow:  isActive ? `0 0 12px ${P.gold}55, 0 0 24px ${P.darkRed}33` : "none",
                    transform:  isActive ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <div style={{
                    fontSize:   "13px",
                    color:      isActive ? P.gold : P.darkMauve,
                    textShadow: isActive ? `0 0 8px ${P.gold}` : "none",
                    fontWeight: 900,
                  }}>
                    {f.num}
                  </div>
                  <div style={{
                    fontSize:      "5px",
                    color:         isActive ? P.gold + "cc" : P.darkMauve + "88",
                    letterSpacing: "0.05em",
                    marginTop:     "2px",
                  }}>
                    F
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM BAR ───────────────────────────── */}
        <div
          className="relative z-10 h-10 flex items-center justify-center"
          style={{
            background: `linear-gradient(90deg, ${P.deepPurple}, ${P.darkMauve}88, ${P.deepPurple})`,
            borderTop:  `2px solid ${P.darkMauve}`,
          }}
        >
          <span style={{
            color:         P.darkRed,
            fontSize:      "7px",
            letterSpacing: "0.3em",
            textShadow:    `0 0 6px ${P.darkRed}`,
          }}>
            AGOGO ADVENTURE: THE GOLDEN ERA
          </span>
        </div>
      </div>

      {/* ── WALKING TRANSITION OVERLAY ──────────────── */}
      {navigating && (
        <div className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center overflow-hidden">
          <div className="flicker mb-2" style={{ color: "#666", fontSize: "7px", letterSpacing: "0.3em" }}>
            NOW ENTERING
          </div>
          <div
            className="flicker"
            style={{
              color:        targetColor,
              fontSize:     "11px",
              letterSpacing:"0.25em",
              textShadow:   `0 0 12px ${targetColor}, 0 0 24px ${targetColor}`,
              marginBottom: "48px",
            }}
          >
            {targetLabel}
          </div>

          {/* Stair scene */}
          <div style={{ position: "relative", width: "100vw", height: "180px", overflow: "hidden" }}>
            {[...Array(9)].map((_, i) => (
              <div key={i}>
                <div style={{
                  position:    "absolute",
                  bottom:      `${14 + i * 18}px`,
                  left:        `${6 + i * 10}%`,
                  width:       "11%",
                  height:      "18px",
                  background:  `linear-gradient(180deg, ${P.darkMauve}, ${P.deepPurple})`,
                  border:      `1px solid ${P.darkMauve}`,
                  borderBottom:`3px solid #0a0006`,
                  boxShadow:   `0 3px 0 #111, 0 0 6px ${targetColor}22`,
                  imageRendering: "pixelated",
                }} />
                <div style={{
                  position:  "absolute",
                  bottom:    `${14 + i * 18}px`,
                  left:      `${6 + i * 10}%`,
                  width:     "3px",
                  height:    `${18 * (i + 1)}px`,
                  background:"#0a0006",
                  transform: "translateY(100%)",
                }} />
                <div style={{
                  position:   "absolute",
                  bottom:     `${31 + i * 18}px`,
                  left:       `${6 + i * 10}%`,
                  width:      "5px",
                  height:     "5px",
                  borderRadius:"50%",
                  background: targetColor,
                  boxShadow:  `0 0 6px ${targetColor}`,
                  opacity:    0.8,
                  animation:  `dotEat 0.22s linear ${i * 0.22}s forwards`,
                }} />
              </div>
            ))}
            <div className="walker-stairs" style={{ position: "absolute" }}>
              <PixelWalker color={targetColor} />
            </div>
          </div>

          <div style={{ marginTop: "32px", color: "#333", fontSize: "7px", letterSpacing: "0.3em" }}>
            ▶ ▶ ▶
          </div>
        </div>
      )}

      <style jsx global>{`
        .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }

        @keyframes gridPan {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .grid-pan { animation: gridPan 4s linear infinite; }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1);    opacity: 0.5; }
          50%       { transform: translateY(-16px) scale(1.2); opacity: 0.9; }
        }
        .orb { animation: orbFloat 3s ease-in-out infinite; }

        @keyframes storeFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-6px); }
        }
        .store-node { animation: storeFloat 2.8s ease-in-out infinite; }
        .store-node:nth-child(1) { animation-delay: 0s; }
        .store-node:nth-child(2) { animation-delay: 0.7s; }

        .store-node:hover .store-body {
          filter: brightness(1.6) saturate(1.4);
          box-shadow: 0 0 32px var(--g), 0 0 64px var(--c) !important;
        }
        .store-node:hover .store-icon {
          transform: scale(1.15);
          transition: transform 0.15s;
        }

        @keyframes walkStairs {
          0%   { bottom: 32px;  left: 4%;   }
          11%  { bottom: 50px;  left: 14%;  }
          22%  { bottom: 68px;  left: 24%;  }
          33%  { bottom: 86px;  left: 34%;  }
          44%  { bottom: 104px; left: 44%;  }
          55%  { bottom: 122px; left: 54%;  }
          66%  { bottom: 140px; left: 64%;  }
          77%  { bottom: 158px; left: 74%;  }
          88%  { bottom: 176px; left: 84%;  }
          100% { bottom: 194px; left: 110%; }
        }
        .walker-stairs { animation: walkStairs 2.2s linear forwards; }

        @keyframes legL  { 0%,100%{transform:rotate(30deg)}  50%{transform:rotate(-30deg)} }
        @keyframes legR  { 0%,100%{transform:rotate(-30deg)} 50%{transform:rotate(30deg)}  }
        @keyframes armL  { 0%,100%{transform:rotate(-25deg)} 50%{transform:rotate(25deg)}  }
        @keyframes armR  { 0%,100%{transform:rotate(25deg)}  50%{transform:rotate(-25deg)} }
        @keyframes bodyBob { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-3px)} }
        .pixel-walker { animation: bodyBob 0.22s ease-in-out infinite; }
        .leg-l { animation: legL  0.22s ease-in-out infinite; }
        .leg-r { animation: legR  0.22s ease-in-out infinite; }
        .arm-l { animation: armL  0.22s ease-in-out infinite; }
        .arm-r { animation: armR  0.22s ease-in-out infinite; }

        @keyframes dotEat {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(0); }
        }
        @keyframes flicker {
          0%,92%,96%,100%{opacity:1}
          94%,98%        {opacity:0.3}
        }
        .flicker { animation: flicker 1.5s ease-in-out infinite; }
      `}</style>
    </>
  );
}
