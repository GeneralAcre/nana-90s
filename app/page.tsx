"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function Blink({ children, ms = 550 }: { children: React.ReactNode; ms?: number }) {
  const [v, setV] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setV(s => !s), ms);
    return () => clearInterval(t);
  }, [ms]);
  return <span style={{ visibility: v ? "visible" : "hidden" }}>{children}</span>;
}

// Mini Dancer for the chase
function MiniDancer({ outfitColor, hairColor }: { outfitColor: string; hairColor: string }) {
  return (
    <div style={{ transform: "scale(0.6)", transformOrigin: "bottom" }}>
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

// Mini Bouncer for the chase
function MiniBouncer() {
  return (
    <div style={{ transform: "scale(0.6)", transformOrigin: "bottom" }}>
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

function Bouncer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: 18, height: 18, background: "#8B6355", border: "2px solid #000" }}>
        <div style={{ position: "absolute", top: 4, left: 3, width: 4, height: 2, background: "#000" }} />
        <div style={{ position: "absolute", top: 4, right: 3, width: 4, height: 2, background: "#000" }} />
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

const DANCERS = [
  { outfitColor: "#FF69B4", hairColor: "#1a0a00", bobDelay: "0s" },
  { outfitColor: "#9B59B6", hairColor: "#3a1a00", bobDelay: "0.3s" },
  { outfitColor: "#FF4500", hairColor: "#1a1a00", bobDelay: "0.6s" },
  { outfitColor: "#FFD700", hairColor: "#1a0a00", bobDelay: "0.2s" },
  { outfitColor: "#00BFFF", hairColor: "#2a1000", bobDelay: "0.5s" },
];

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/Nana_After_Midnight.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    // Try autoplay immediately; if browser blocks it, start on first tap
    audio.play().then(() => setPlaying(true)).catch(() => {
      const start = () => {
        audio.play().then(() => setPlaying(true)).catch(() => {});
        window.removeEventListener("pointerdown", start);
      };
      window.addEventListener("pointerdown", start);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setPlaying(true); }
    else { audio.pause(); setPlaying(false); }
  }

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
      {/* ── TOP HUD ── */}
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
        <button onClick={toggleMusic} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "center", padding: 0 }}>
          <div style={{ color: "#FF69B4", fontSize: "8px", letterSpacing: "0.3em" }}>MUSIC</div>
          <div style={{ color: "#fff", fontSize: "14px", marginTop: 2 }}>{playing ? "🔊" : "🔇"}</div>
        </button>
      </div>

      {/* ── TITLE ── */}
      <div style={{ textAlign: "center", padding: "30px 16px 8px", flexShrink: 0 }}>
        <div style={{ 
            fontSize: "clamp(36px, 5vw, 48px)", 
            letterSpacing: "0.05em",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
        }}>
          <span style={{ color: "#FFE44D", textShadow: "4px 4px 0 #b87800" }}>GIRL</span>
          <span style={{ color: "#FF69B4", textShadow: "4px 4px 0 #8B0057" }}>OR LADYBOY</span>
        </div>

        <div style={{
            display: "inline-block",
            margin: "15px 0",
            padding: "6px clamp(10px, 4vw, 24px)",
            background: "#FF69B4",
            color: "#000",
            fontSize: "clamp(10px, 3.5vw, 20px)",
            boxShadow: "3px 3px 0 #8B0057",
            letterSpacing: "0.1em",
            maxWidth: "90vw",
            textAlign: "center",
        }}>
            CAN YOU TELL THE DIFFERENCE?
        </div>
      </div>

      {/* ── CHARACTER LINEUP ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        gap: "clamp(6px, 2vw, 24px)",
        padding: "20px 16px 0",
        flexShrink: 0,
        transform: "scale(clamp(0.6, 6vw, 1))",
        transformOrigin: "center bottom",
      }}>
        <Bouncer />
        {DANCERS.map((d, i) => <Dancer key={i} {...d} />)}
        <Bouncer />
      </div>

      {/* ── CHASE STRIP ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        height: 64, flexShrink: 0,
        background: "rgba(0,0,0,0.5)",
        borderTop: "2px solid #FF69B444",
        borderBottom: "2px solid #FF69B444",
        marginTop: 20,
      }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{ position: "absolute", left: `${(i + 0.5) * (100 / 15)}%`, top: "50%", transform: "translateY(-50%)", color: "#FF69B433", fontSize: "10px" }}>♥</div>
        ))}

        <div className="man-run" style={{ position: "absolute", bottom: 10 }}>
          <MiniBouncer />
        </div>

        <div className="girl-chase" style={{ position: "absolute", bottom: 10 }}>
          <div className="dancer-bob">
            <MiniDancer outfitColor="#FF69B4" hairColor="#000" />
          </div>
        </div>
      </div>

      {/* ── BUTTON ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Link href="/story" style={{ textDecoration: "none" }}>
          <div className="coin-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: "rgba(0,0,0,0.85)", border: "3px solid #FFE44D", boxShadow: "4px 4px 0 #7a5800", cursor: "pointer" }}>
            <span style={{ color: "#FFE44D", fontSize: "10px", letterSpacing: "0.3em" }}>฿ INSERT COIN</span>
            <span style={{ color: "#FF69B4", fontSize: "10px", letterSpacing: "0.3em" }}><Blink>&amp; PRESS START</Blink></span>
          </div>
        </Link>
        <Link href="/tips" style={{ textDecoration: "none", marginTop: 14 }}>
          <div style={{ fontSize: "8px", color: "#ffffff55", letterSpacing: "0.2em", cursor: "pointer", padding: "6px 16px", border: "1px solid #ffffff22" }}>
            HOW TO TELL THE DIFFERENCE
          </div>
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid #ffffff22" }}>
        <div style={{ textAlign: "center", padding: "8px 20px 4px", fontSize: "8px", color: "#ffffff99", letterSpacing: "0.25em" }}>
          INSPIRED BY NANA PLAZA · SUKHUMVIT SOI 4 · BANGKOK
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 20px 12px" }}>
          <span style={{ color: "#ffffff55", fontSize: "8px" }}>© 2026 SOI4 GAMES</span>
          <span style={{ color: "#FF69B4", fontSize: "8px" }}><Blink ms={1100}>▶ PLAYER 1</Blink></span>
          <span style={{ color: "#ffffff55", fontSize: "8px" }}>BKK_SOI_4</span>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes manRun {
          0%   { left: -100px; }
          100% { left: calc(100% + 150px); }
        }
        @keyframes girlChase {
          0%   { left: -220px; }
          100% { left: calc(100% + 30px); }
        }

        .man-run { animation: manRun 6s linear infinite; }
        .girl-chase { animation: girlChase 6.5s linear infinite; }

        @keyframes dancerBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        .dancer-bob { animation: dancerBob 0.6s ease-in-out infinite; }

        .coin-btn:hover { filter: brightness(1.2); }
        .coin-btn:active { transform: translate(2px, 2px); }
      `}</style>
    </div>
  );
}