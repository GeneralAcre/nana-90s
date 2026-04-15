"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SLIDES = [
  {
    location: "SUKHUMVIT SOI 4 · BANGKOK",
    time:     "2:00 AM — FRIDAY NIGHT",
    lines: [
      "The heat clings to your skin",
      "as you step off the BTS.",
      "",
      "Neon signs bleed pink and gold",
      "into the humid night air.",
      "",
      "Welcome to Nana Plaza.",
    ],
  },
  {
    location: null,
    time:     null,
    lines: [
      "Your mate BigTom leans over",
      "with a grin and a cold Chang.",
      "",
      "\"500 baht says you can't tell",
      "the difference...\"",
      "",
      "\"They all look the same",
      "to you farangs.\"",
    ],
  },
  {
    location: null,
    time:     null,
    lines: [
      "You glance at the bars.",
      "The dancers. The smiles.",
      "",
      "The music is loud.",
      "The lights are bright.",
      "The stakes are real.",
      "",
      "You take a sip. You think.",
    ],
  },
  {
    location: "THE CHALLENGE",
    time:     null,
    lines: [
      "Visit the bars of Nana Plaza.",
      "Talk to the girls.",
      "Collect clues.",
      "",
      "At the end — make your guess.",
      "",
      "GIRL... or LADYBOY?",
    ],
  },
];

function useTypewriter(text: string, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  return { displayed, done };
}

export default function StoryPage() {
  const router = useRouter();
  const [slide, setSlide]     = useState(0);
  const [line, setLine]       = useState(0);
  const [skip, setSkip]       = useState(false);
  const [allDone, setAllDone] = useState(false);
  const skipRef = useRef(false);

  const currentSlide = SLIDES[slide];
  const visibleLines = currentSlide.lines.slice(0, line + 1);
  const currentLine  = visibleLines[visibleLines.length - 1] ?? "";

  const { displayed, done: lineDone } = useTypewriter(skip ? currentLine : currentLine, skip ? 0 : 38);

  // Auto-advance lines within a slide
  useEffect(() => {
    if (!lineDone) return;
    if (line < currentSlide.lines.length - 1) {
      const t = setTimeout(() => setLine(l => l + 1), 220);
      return () => clearTimeout(t);
    }
  }, [lineDone, line, currentSlide.lines.length]);

  function advance() {
    if (!lineDone) {
      // Skip current typewriter
      setSkip(true);
      setTimeout(() => setSkip(false), 50);
      return;
    }
    const lastLine = line >= currentSlide.lines.length - 1;
    if (!lastLine) { setLine(l => l + 1); return; }

    if (slide < SLIDES.length - 1) {
      setSlide(s => s + 1);
      setLine(0);
    } else {
      setAllDone(true);
    }
  }

  const isLastSlide = slide === SLIDES.length - 1;
  const isLastLine  = line >= currentSlide.lines.length - 1;

  return (
    <div
      className="relative w-screen h-dvh flex flex-col overflow-hidden select-none"
      style={{ fontFamily: "'Press Start 2P', monospace", background: "#000" }}
      onClick={allDone ? undefined : advance}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.12]"
        style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 4px)" }} />

      {/* Skip all */}
      {!allDone && (
        <button
          onClick={e => { e.stopPropagation(); setAllDone(true); }}
          className="absolute top-4 right-5 z-20"
          style={{ fontSize: "8px", color: "#ffffff44", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.2em" }}
        >
          SKIP ▶▶
        </button>
      )}

      {/* Slide counter dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <div key={i} style={{ width: 6, height: 6, background: i === slide ? "#FFE44D" : "#333", border: "1px solid #555" }} />
        ))}
      </div>

      {/* Content */}
      {!allDone ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
          {/* Location / time badge */}
          {(currentSlide.location || currentSlide.time) && (
            <div className="text-center mb-4">
              {currentSlide.location && (
                <div style={{ fontSize: "clamp(8px,1.2vw,11px)", color: "#FFE44D", letterSpacing: "0.3em", marginBottom: 6 }}>
                  {currentSlide.location}
                </div>
              )}
              {currentSlide.time && (
                <div style={{ fontSize: "clamp(7px,0.9vw,9px)", color: "#888", letterSpacing: "0.25em" }}>
                  {currentSlide.time}
                </div>
              )}
            </div>
          )}

          {/* Text box */}
          <div
            className="w-full max-w-xl"
            style={{
              background: "rgba(0,0,0,0.92)",
              border: "3px solid #FFE44D",
              boxShadow: "0 0 30px #FFE44D22, 6px 6px 0 #5A2A00",
              padding: "clamp(20px,4vw,36px) clamp(16px,3vw,32px)",
              minHeight: "clamp(160px,28vh,240px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1 }}>
              {visibleLines.map((l, i) => {
                const isCurrentLine = i === visibleLines.length - 1;
                return (
                  <div
                    key={i}
                    style={{
                      fontSize:      "clamp(9px,1.4vw,14px)",
                      color:         "#E8E0D0",
                      lineHeight:    2.2,
                      letterSpacing: "0.05em",
                      minHeight:     "1.2em",
                    }}
                  >
                    {isCurrentLine ? displayed : l}
                  </div>
                );
              })}
            </div>

            {/* Advance hint */}
            <div className="mt-4 text-right">
              {lineDone && isLastLine && isLastSlide ? null : (
                <span style={{ fontSize: "8px", color: "#FFE44D88", animation: "blink 0.9s step-end infinite" }}>
                  {lineDone ? "▼ TAP" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Final CTA */
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 text-center">
          <div style={{ fontSize: "clamp(28px,6vw,52px)", color: "#FFE44D", textShadow: "0 0 24px #FFB800, 4px 4px 0 #5A2A00", letterSpacing: "0.1em", lineHeight: 1.3 }}>
            GIRL<br />
            <span style={{ color: "#FF69B4", textShadow: "4px 4px 0 #8B0057" }}>OR LADYBOY?</span>
          </div>
          <div style={{ fontSize: "clamp(9px,1.2vw,13px)", color: "#aaa", letterSpacing: "0.2em", lineHeight: 2 }}>
            CAN YOU TELL THE DIFFERENCE?
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/wardrobe"
              style={{
                fontSize:   "clamp(10px,1.4vw,14px)",
                padding:    "16px 36px",
                background: "linear-gradient(180deg, #4A043A, #100008)",
                border:     "3px solid #FF69B4",
                color:      "#FF69B4",
                textDecoration: "none",
                letterSpacing: "0.2em",
                boxShadow:  "0 0 24px #FF69B455, 4px 4px 0 #3a0028",
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              ▶ PLAY NOW
            </Link>
            <Link
              href="/tips"
              style={{
                fontSize:   "clamp(8px,1vw,11px)",
                padding:    "14px 24px",
                background: "transparent",
                border:     "2px solid #FFE44D55",
                color:      "#FFE44D88",
                textDecoration: "none",
                letterSpacing: "0.2em",
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              TIPS FIRST
            </Link>
          </div>
          <Link href="/" style={{ fontSize: "7px", color: "#ffffff33", letterSpacing: "0.2em", textDecoration: "none", marginTop: 8 }}>
            ◀ BACK
          </Link>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
