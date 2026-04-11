"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function Blink({ children, ms = 550 }: { children: React.ReactNode; ms?: number }) {
  const [v, setV] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setV(s => !s), ms);
    return () => clearInterval(t);
  }, [ms]);
  return <span style={{ visibility: v ? "visible" : "hidden" }}>{children}</span>;
}

// Pac-Man ghost sprite
function Ghost({ color }: { color: string }) {
  return (
    <div style={{ width: 26, height: 30, position: "relative", imageRendering: "pixelated" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 16, background: color, borderRadius: "13px 13px 0 0" }} />
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, bottom: 6, background: color }} />
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", bottom: 0, left: `${i * 33.3}%`, width: "34%", height: 7, background: color }} />
      ))}
      <div style={{ position: "absolute", top: 7, left: 4, width: 7, height: 8, background: "#fff", borderRadius: "3px 3px 0 0" }}>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 4, height: 5, background: "#001aff", borderRadius: "2px 2px 0 0" }} />
      </div>
      <div style={{ position: "absolute", top: 7, right: 4, width: 7, height: 8, background: "#fff", borderRadius: "3px 3px 0 0" }}>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 4, height: 5, background: "#001aff", borderRadius: "2px 2px 0 0" }} />
      </div>
    </div>
  );
}

// Pixel art dancer for character lineup
function Dancer({ outfitColor, hairColor, bobDelay }: { outfitColor: string; hairColor: string; bobDelay: string }) {
  return (
    <div className="dancer-bob" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: bobDelay }}>
      <div style={{ position: "relative", width: 18, height: 18, background: "#F5C5A0", border: "2px solid #000" }}>
        <div style={{ position: "absolute", top: 5, left: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", top: 5, right: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 5, height: 2, background: "#c0605a" }} />
        <div style={{ position: "absolute", top: -5, left: -2, width: 22, height: 8, background: hairColor, border: "2px solid #000", borderBottom: "none" }} />
      </div>
      <div style={{ width: 22, height: 24, background: outfitColor, border: "2px solid #000" }} />
      <div style={{ display: "flex", gap: 2 }}>
        <div style={{ width: 7, height: 10, background: outfitColor, border: "2px solid #000" }} />
        <div style={{ width: 7, height: 10, background: outfitColor, border: "2px solid #000" }} />
      </div>
    </div>
  );
}

// Pixel bouncer figure
function Bouncer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: 18, height: 18, background: "#8B6355", border: "2px solid #000" }}>
        <div style={{ position: "absolute", top: 5, left: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", top: 5, right: 3, width: 3, height: 3, background: "#000" }} />
        <div style={{ position: "absolute", top: -4, left: -1, width: 20, height: 5, background: "#3a2010", border: "2px solid #000", borderBottom: "none" }} />
      </div>
      <div style={{ width: 26, height: 28, background: "#1c1c1c", border: "2px solid #333" }} />
      <div style={{ display: "flex", gap: 2 }}>
        <div style={{ width: 9, height: 12, background: "#1c1c1c", border: "2px solid #333" }} />
        <div style={{ width: 9, height: 12, background: "#1c1c1c", border: "2px solid #333" }} />
      </div>
    </div>
  );
}

const GHOSTS = [
  { color: "#FF4444" },
  { color: "#FF69B4" },
  { color: "#9B59B6" },
  { color: "#00BFFF" },
  { color: "#FF4500" },
];

const DANCERS = [
  { outfitColor: "#FF69B4", hairColor: "#1a0a00", bobDelay: "0s" },
  { outfitColor: "#9B59B6", hairColor: "#3a1a00", bobDelay: "0.3s" },
  { outfitColor: "#FF4500", hairColor: "#1a1a00", bobDelay: "0.6s" },
  { outfitColor: "#FFD700", hairColor: "#1a0a00", bobDelay: "0.2s" },
  { outfitColor: "#00BFFF", hairColor: "#2a1000", bobDelay: "0.5s" },
];

export default function LandingPage() {
  return (
    <div
      style={{
        position: "relative", width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        color: "#fff",
        background: "rgba(0,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      {/* ── TOP HUD BAR ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 24px 8px",
        background: "rgba(0,0,0,0.75)",
        borderBottom: "3px solid #FFE44D33",
        flexShrink: 0,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#FFE44D", fontSize: "8px", letterSpacing: "0.3em" }}>1UP</div>
          <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "0.2em", marginTop: 2 }}>000000</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#FFE44D", fontSize: "8px", letterSpacing: "0.3em" }}>HIGH SCORE</div>
          <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "0.2em", marginTop: 2 }}>999900</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#FFE44D", fontSize: "8px", letterSpacing: "0.3em" }}>CREDITS</div>
          <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "0.2em", marginTop: 2 }}>
            <Blink ms={800}>02</Blink>
          </div>
        </div>
      </div>

      {/* ── MAIN TITLE ── */}
      <div style={{ textAlign: "center", padding: "20px 16px 8px", flexShrink: 0 }}>
        <div style={{
          fontSize: "clamp(32px, 7vw, 68px)",
          color: "#FFE44D",
          textShadow: "4px 4px 0 #b87800, 8px 8px 0 #5a3800, 0 0 40px #FFB80088",
          letterSpacing: "0.12em",
          lineHeight: 1,
        }}>NANA</div>

        {/* SOI 4 badge — sits between the two words */}
        <div style={{
          display: "inline-block",
          margin: "6px 0",
          padding: "4px 20px",
          background: "#FF69B4",
          color: "#000",
          fontSize: "clamp(7px, 1.4vw, 11px)",
          letterSpacing: "0.35em",
          boxShadow: "3px 3px 0 #8B0057, 0 0 16px #FF1493aa",
        }}>SOI 4</div>

        <div style={{
          fontSize: "clamp(32px, 7vw, 68px)",
          color: "#FF69B4",
          textShadow: "4px 4px 0 #8B0057, 8px 8px 0 #3a0025, 0 0 40px #FF149388",
          letterSpacing: "0.12em",
          lineHeight: 1,
          marginTop: 0,
        }}>PLAZA</div>

        <div style={{
          color: "#E0C8FF",
          fontSize: "clamp(8px, 1.6vw, 13px)",
          letterSpacing: "0.35em",
          marginTop: 10,
          textShadow: "0 0 8px #9B59B6",
        }}>THE GOLDEN ERA</div>
      </div>

      {/* ── CHARACTER LINEUP ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        gap: "clamp(8px, 2vw, 24px)",
        padding: "8px 16px 0",
        flexShrink: 0,
      }}>
        <Bouncer />
        {DANCERS.map((d, i) => <Dancer key={i} {...d} />)}
        <Bouncer />
      </div>

      {/* ── PAC-MAN CHASE STRIP ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        height: 64, flexShrink: 0,
        background: "rgba(0,0,0,0.5)",
        borderTop: "2px solid #FFE44D44",
        borderBottom: "2px solid #FFE44D44",
        marginTop: 10,
      }}>
        {/* Pellets */}
        {[...Array(28)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i + 0.5) * (100 / 28)}%`,
            top: "50%", transform: "translateY(-50%)",
            width: i % 7 === 0 ? 10 : 5,
            height: i % 7 === 0 ? 10 : 5,
            background: "#FFE44D",
            borderRadius: "50%",
            boxShadow: i % 7 === 0 ? "0 0 8px #FFB800, 0 0 16px #FF8800" : "0 0 3px #FFB80088",
          }} />
        ))}

        {/* Pac-Man */}
        <div className="pac-walk" style={{ position: "absolute", top: "50%", transform: "translateY(-55%)", animationDelay: "0s" }}>
          <div className="pacman-sprite" />
        </div>

        {/* Ghosts */}
        {GHOSTS.map((g, i) => (
          <div key={i} className="pac-walk" style={{ position: "absolute", top: "50%", transform: "translateY(-60%)", animationDelay: `${(i + 1) * 0.55}s` }}>
            <Ghost color={g.color} />
          </div>
        ))}
      </div>

      {/* ── STAGE INFO ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
        padding: "8px 24px",
      }}>
        <div style={{ color: "#9B59B655", fontSize: "7px", letterSpacing: "0.4em" }}>
          ◆ SUKHUMVIT SOI 4, BANGKOK ◆
        </div>
        <div style={{
          color: "#FFE44D55", fontSize: "7px", letterSpacing: "0.2em",
          border: "1px solid #FFE44D22", padding: "4px 14px",
        }}>
          STAGE 01 — ENTER THE BAR
        </div>
      </div>

      {/* ── INSERT COIN BUTTON ── */}
      <div style={{ textAlign: "center", padding: "4px 0 14px", flexShrink: 0 }}>
        <Link href="/wardrobe" style={{ textDecoration: "none" }}>
          <div className="coin-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "9px 24px",
            background: "rgba(0,0,0,0.85)",
            border: "3px solid #FFE44D",
            boxShadow: "0 0 14px #FFB80055, 0 0 28px #FFB80022, 4px 4px 0 #7a5800",
            cursor: "pointer",
          }}>
            <span style={{ color: "#FFE44D", fontSize: "clamp(7px, 1.4vw, 10px)", letterSpacing: "0.3em" }}>
              ฿ INSERT COIN
            </span>
            <span style={{ color: "#FF69B4", fontSize: "clamp(7px, 1.4vw, 10px)", letterSpacing: "0.3em" }}>
              <Blink>&amp; PRESS START</Blink>
            </span>
          </div>
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "6px 20px 10px",
        borderTop: "1px solid #ffffff11",
        flexShrink: 0,
      }}>
        <span style={{ color: "#ffffff33", fontSize: "7px", letterSpacing: "0.2em" }}>© 2026 SOI4 GAMES</span>
        <span style={{ color: "#FF69B4", fontSize: "7px", letterSpacing: "0.25em" }}>
          <Blink ms={1100}>▶ PLAYER 1</Blink>
        </span>
        <span style={{ color: "#ffffff33", fontSize: "7px", letterSpacing: "0.2em" }}>BKK_SOI_4</span>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        /* ── Pac-Man sprite (CSS only) ── */
        .pacman-sprite {
          width: 34px; height: 34px;
          background: #FFE400;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }
        .pacman-sprite::before,
        .pacman-sprite::after {
          content: '';
          position: absolute;
          width: 50%; height: 50%;
          background: #000;
          right: 0;
          transform-origin: left center;
        }
        .pacman-sprite::before {
          top: 0;
          animation: mouthTop 0.22s ease-in-out infinite;
        }
        .pacman-sprite::after {
          bottom: 0;
          animation: mouthBot 0.22s ease-in-out infinite;
        }
        @keyframes mouthTop {
          0%,100% { transform: rotate(-38deg); }
          50%      { transform: rotate(0deg); }
        }
        @keyframes mouthBot {
          0%,100% { transform: rotate(38deg); }
          50%      { transform: rotate(0deg); }
        }

        /* ── Chase walk ── */
        @keyframes chaseWalk {
          0%   { left: -50px; }
          100% { left: calc(100% + 50px); }
        }
        .pac-walk {
          animation-name: chaseWalk;
          animation-duration: 7s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* ── Dancer bob ── */
        @keyframes dancerBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        .dancer-bob {
          animation: dancerBob 0.8s ease-in-out infinite;
        }

        /* ── Button hover ── */
        .coin-btn:hover {
          box-shadow: 0 0 22px #FFB800aa, 0 0 44px #FFB80044, 4px 4px 0 #7a5800 !important;
          filter: brightness(1.15);
        }
        .coin-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #7a5800 !important;
        }
      `}</style>
    </div>
  );
}
