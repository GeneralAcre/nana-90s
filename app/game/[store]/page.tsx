"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "../../context/GameContext";
import { storeNPCs, NPC } from "../npcData";

// ── store meta ──────────────────────────────────────────
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

// ── pixel-art NPC sprite ─────────────────────────────────
function NPCSprite({
  npc,
  active,
  done,
  onClick,
}: {
  npc: NPC;
  active: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={done}
      className="flex flex-col items-center gap-1 group transition-all"
      style={{ opacity: done ? 0.4 : 1, cursor: done ? "default" : "pointer" }}
    >
      {/* sprite */}
      <div
        className="relative pixel-bob"
        style={{
          filter: active ? `drop-shadow(0 0 10px ${npc.outfitColor})` : "none",
        }}
      >
        {/* head */}
        <div
          style={{
            width: 20, height: 20,
            background: "#F5C5A0",
            border: "2px solid #000",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* eyes */}
          <div style={{ position: "absolute", top: 6, left: 4, width: 3, height: 3, background: "#000" }} />
          <div style={{ position: "absolute", top: 6, right: 4, width: 3, height: 3, background: "#000" }} />
          {/* mouth */}
          <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 6, height: 2, background: "#c0605a" }} />
        </div>
        {/* hair */}
        <div
          style={{
            position: "absolute", top: -6, left: -2,
            width: 24, height: 10,
            background: npc.hairColor,
            border: "2px solid #000",
            borderBottom: "none",
          }}
        />
        {/* body */}
        <div
          style={{
            width: 24, height: 30,
            background: npc.outfitColor,
            border: "2px solid #000",
            margin: "0 auto",
          }}
        />
        {/* legs */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
          <div style={{ width: 8, height: 14, background: npc.outfitColor, border: "2px solid #000" }} />
          <div style={{ width: 8, height: 14, background: npc.outfitColor, border: "2px solid #000" }} />
        </div>
        {/* click hint */}
        {!done && !active && (
          <div
            className="talk-bounce absolute -top-6 left-1/2 -translate-x-1/2 text-center"
            style={{ fontSize: "8px", color: "#FFE44D", whiteSpace: "nowrap", textShadow: "0 0 4px #FFB800" }}
          >
            TALK
          </div>
        )}
      </div>
      <span style={{ fontSize: "7px", color: active ? "#FFE44D" : "#E0C8FF", textShadow: active ? "0 0 6px #FFB800" : "none", letterSpacing: "0.1em" }}>
        {npc.name.toUpperCase()}
      </span>
    </button>
  );
}

// ── Pixel torch with flame ───────────────────────────────
function PixelTorch({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", width: 16, imageRendering: "pixelated", ...style }}>
      {/* flame layers */}
      <div className="torch-flame-outer" style={{ width: 16, height: 18, background: "transparent", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 12, height: 14, background: "#FF6600", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 8, height: 10, background: "#FFAA00", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 6, background: "#FFE800", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
      </div>
      {/* torch handle */}
      <div style={{ width: 6, height: 16, background: "#8B5E3C", border: "1px solid #5a3a1a", margin: "0 auto" }} />
      {/* wall bracket */}
      <div style={{ width: 14, height: 4, background: "#555", border: "1px solid #333", margin: "0 auto" }} />
    </div>
  );
}

// ── Dungeon background ────────────────────────────────────
function DungeonBg({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Stone tile floor */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#1c1c24",
        backgroundImage: [
          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.5) 39px, rgba(0,0,0,0.5) 40px)",
          "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.5) 39px, rgba(0,0,0,0.5) 40px)",
        ].join(","),
      }} />
      {/* Darker stone ceiling band */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "28%", background: "#111118", borderBottom: "4px solid #2a2a36" }} />
      {/* Ceiling stone texture */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "28%",
        backgroundImage: [
          "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.5) 19px, rgba(0,0,0,0.5) 20px)",
          "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.5) 39px, rgba(0,0,0,0.5) 40px)",
        ].join(","),
      }} />

      {/* Left wall pillar */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 48, background: "linear-gradient(90deg, #0e0e14, #1a1a24)", borderRight: "3px solid #2e2e3e" }} />
      {/* Right wall pillar */}
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 48, background: "linear-gradient(270deg, #0e0e14, #1a1a24)", borderLeft: "3px solid #2e2e3e" }} />

      {/* Left banner */}
      <div style={{ position: "absolute", top: "4%", left: 60, width: 28, height: 90, background: color, border: "2px solid #000", boxShadow: `0 0 14px ${glow}88`, imageRendering: "pixelated" }}>
        <div style={{ position: "absolute", top: "30%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", top: "55%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
        {/* Fringe */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", bottom: -8, left: i * 6, width: 4, height: 8, background: color, border: "1px solid #000" }} />
        ))}
      </div>

      {/* Right banner */}
      <div style={{ position: "absolute", top: "4%", right: 60, width: 28, height: 90, background: color, border: "2px solid #000", boxShadow: `0 0 14px ${glow}88`, imageRendering: "pixelated" }}>
        <div style={{ position: "absolute", top: "30%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", top: "55%", left: 4, right: 4, height: 2, background: "rgba(0,0,0,0.5)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", bottom: -8, left: i * 6, width: 4, height: 8, background: color, border: "1px solid #000" }} />
        ))}
      </div>

      {/* Torches */}
      <PixelTorch style={{ top: "22%", left: 110 }} />
      <PixelTorch style={{ top: "22%", right: 110 }} />
      <PixelTorch style={{ top: "55%", left: 90 }} />
      <PixelTorch style={{ top: "55%", right: 90 }} />

      {/* Torch glow halos */}
      {[{ l: 118, t: "22%" }, { r: 118, t: "22%" }, { l: 98, t: "55%" }, { r: 98, t: "55%" }].map((pos, i) => (
        <div key={i} className="torch-glow" style={{
          position: "absolute",
          top: pos.t,
          ...("l" in pos ? { left: pos.l } : { right: pos.r }),
          width: 60, height: 60,
          background: "radial-gradient(circle, rgba(255,140,0,0.25) 0%, transparent 70%)",
          transform: "translate(-50%, -30%)",
          pointerEvents: "none",
        }} />
      ))}

      {/* Barrel — bottom left */}
      <div style={{ position: "absolute", bottom: 80, left: 60, imageRendering: "pixelated" }}>
        <div style={{ width: 28, height: 36, background: "#6B3A1F", border: "2px solid #3d2010", borderRadius: "4px", position: "relative", boxShadow: "2px 2px 0 #1a0d06" }}>
          <div style={{ position: "absolute", top: 6, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
          <div style={{ position: "absolute", top: 14, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
          <div style={{ position: "absolute", top: 22, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
        </div>
      </div>
      {/* Barrel — bottom right */}
      <div style={{ position: "absolute", bottom: 80, right: 60, imageRendering: "pixelated" }}>
        <div style={{ width: 28, height: 36, background: "#6B3A1F", border: "2px solid #3d2010", borderRadius: "4px", position: "relative", boxShadow: "2px 2px 0 #1a0d06" }}>
          <div style={{ position: "absolute", top: 6, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
          <div style={{ position: "absolute", top: 14, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
          <div style={{ position: "absolute", top: 22, left: -2, right: -2, height: 3, background: "#8B5E2F", border: "1px solid #3d2010" }} />
        </div>
      </div>
      {/* Small crate — bottom left cluster */}
      <div style={{ position: "absolute", bottom: 80, left: 96, width: 20, height: 20, background: "#7B5030", border: "2px solid #3d2010", boxShadow: "2px 2px 0 #1a0d06", imageRendering: "pixelated" }}>
        <div style={{ position: "absolute", top: 1, left: 1, right: 1, bottom: 1, border: "1px solid #3d2010" }} />
      </div>

      {/* Floor dark vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />

      {/* Ambient color tint from store */}
      <div style={{ position: "absolute", inset: 0, background: color, opacity: 0.04, pointerEvents: "none" }} />

      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.18) 3px,rgba(0,0,0,0.18) 4px)", opacity: 0.5 }} />
    </div>
  );
}

// ── main page ────────────────────────────────────────────
type Phase = "browse" | "talking" | "guess" | "reveal" | "complete";

export default function StorePage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const { store } = use(params);
  const { suitColor } = useGame();

  const meta   = storeMeta[store];
  const npcs   = storeNPCs[store] ?? [];
  const charImg = playerChars[suitColor] ?? "/characters/George.png";

  const [phase, setPhase]           = useState<Phase>("browse");
  const [npcIndex, setNpcIndex]     = useState(0);
  const [turnIndex, setTurnIndex]   = useState(0);
  const [clues, setClues]           = useState<string[]>([]);
  const [latestClue, setLatestClue] = useState<string | null>(null);
  const [score, setScore]           = useState(0);
  const [hearts, setHearts]         = useState(3);
  const [results, setResults]       = useState<{ name: string; correct: boolean }[]>([]);
  const [doneNPCs, setDoneNPCs]     = useState<Set<number>>(new Set());
  const [revealCorrect, setRevealCorrect] = useState<boolean | null>(null);

  if (!meta) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0020] text-white">
        <p>Store not found.</p>
        <Link href="/game" className="underline ml-4 text-purple-300">Back</Link>
      </div>
    );
  }

  const currentNPC  = npcs[npcIndex];
  const currentTurn = currentNPC?.dialogues[turnIndex];

  // ── handlers ──────────────────────────────────────────
  function startTalking(idx: number) {
    setNpcIndex(idx);
    setTurnIndex(0);
    setClues([]);
    setLatestClue(null);
    setPhase("talking");
  }

  function handleChoice(clue: string | null) {
    if (clue) {
      setClues((prev) => [...prev, clue]);
      setLatestClue(clue);
    } else {
      setLatestClue(null);
    }
    const nextTurn = turnIndex + 1;
    if (nextTurn >= currentNPC.dialogues.length) {
      setPhase("guess");
    } else {
      setTurnIndex(nextTurn);
    }
  }

  function handleGuess(guessedLadyboy: boolean) {
    const correct = guessedLadyboy === currentNPC.isLadyboy;
    setRevealCorrect(correct);
    if (correct) setScore((s) => s + 1);
    else setHearts((h) => Math.max(0, h - 1));
    setResults((prev) => [...prev, { name: currentNPC.name, correct }]);
    setPhase("reveal");
  }

  function continueAfterReveal() {
    setDoneNPCs((prev) => new Set([...prev, npcIndex]));
    const remaining = npcs.findIndex((_, i) => i !== npcIndex && !doneNPCs.has(i));
    if (doneNPCs.size + 1 >= npcs.length || hearts <= 0) {
      setPhase("complete");
    } else {
      setPhase("browse");
      setLatestClue(null);
      setClues([]);
    }
  }

  // ── render ─────────────────────────────────────────────
  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none flex flex-col"
      style={{ fontFamily: "'Press Start 2P', 'Courier New', monospace" }}
    >
      {/* background */}
      <DungeonBg color={meta.color} glow={meta.glow} />

      {/* ── top bar ─────────────────────────── */}
      <div className="relative z-10 flex items-stretch h-10 shrink-0">
        <Link
          href="/game"
          className="flex items-center px-3 hover:brightness-125 transition-all"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderRight: "none" }}
        >
          <span style={{ color: "#FFE44D", fontSize: "8px" }}>◀ MAP</span>
        </Link>
        <div
          className="flex-1 flex items-center justify-center"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderLeft: "none", borderRight: "none" }}
        >
          <span style={{ color: meta.color, fontSize: "12px", letterSpacing: "0.2em", textShadow: `0 0 10px ${meta.glow}` }}>
            {meta.label}
          </span>
        </div>
        {/* hearts + score */}
        <div
          className="flex items-center gap-2 px-3"
          style={{ background: "#0d0020", border: `2px solid ${meta.color}`, borderLeft: "none" }}
        >
          <span style={{ color: "#FF4444", fontSize: "10px" }}>
            {"♥".repeat(hearts)}{"♡".repeat(3 - hearts)}
          </span>
          <span style={{ color: "#FFE44D", fontSize: "8px" }}>{score}/{npcs.length}</span>
        </div>
      </div>

      {/* ── scene ───────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col">

        {/* NPC row */}
        <div className="flex items-end justify-around px-16 pt-8 pb-4">
          {npcs.map((npc, i) => (
            <NPCSprite
              key={npc.id}
              npc={npc}
              active={phase === "talking" && npcIndex === i}
              done={doneNPCs.has(i)}
              onClick={() => {
                if (phase === "browse" && !doneNPCs.has(i)) startTalking(i);
              }}
            />
          ))}
        </div>

        {/* player character (small, bottom-left) */}
        <div className="absolute bottom-28 left-8" style={{ width: 48, height: 64 }}>
          <Image src={charImg} alt="player" fill className="object-contain pixelated" />
        </div>

        {/* ── BROWSE hint ─── */}
        {phase === "browse" && (
          <div className="flex-1 flex items-end justify-center pb-4">
            <div
              className="px-6 py-3 text-center"
              style={{ background: "#0d0020cc", border: `2px solid ${meta.color}`, boxShadow: `0 0 12px ${meta.color}44` }}
            >
              <p style={{ color: "#E0C8FF", fontSize: "9px", letterSpacing: "0.1em" }}>
                {doneNPCs.size === 0
                  ? "▲ CLICK A GIRL TO TALK TO HER"
                  : `${npcs.length - doneNPCs.size} GIRL${npcs.length - doneNPCs.size !== 1 ? "S" : ""} REMAINING — CHOOSE WISELY`}
              </p>
            </div>
          </div>
        )}

        {/* ── TALKING dialogue box ─── */}
        {(phase === "talking" || phase === "guess") && currentNPC && (
          <div className="flex-1 flex flex-col justify-end px-4 pb-4 gap-3">

            {/* clue flash */}
            {latestClue && (
              <div className="text-center px-4">
                <span style={{ color: "#FFE44D", fontSize: "8px", fontStyle: "italic", textShadow: "0 0 6px #FFB800" }}>
                  👁 {latestClue}
                </span>
              </div>
            )}

            {/* dialogue box */}
            <div
              className="w-full p-4"
              style={{
                background: "#0a0018ee",
                border: `3px solid ${currentNPC.outfitColor}`,
                boxShadow: `0 0 16px ${currentNPC.outfitColor}44`,
              }}
            >
              {phase === "talking" && currentTurn && (
                <>
                  <p style={{ color: currentNPC.outfitColor, fontSize: "8px", marginBottom: 8, textShadow: `0 0 6px ${currentNPC.outfitColor}` }}>
                    {currentNPC.name.toUpperCase()}
                  </p>
                  <p style={{ color: "#E0C8FF", fontSize: "9px", lineHeight: 1.8, fontFamily: "sans-serif", marginBottom: 12 }}>
                    {currentTurn.npcLine}
                  </p>
                  <div className="flex flex-col gap-2">
                    {currentTurn.choices.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleChoice(c.clue)}
                        className="text-left px-3 py-2 transition-all hover:brightness-125 active:scale-[0.98]"
                        style={{
                          background: "#1a0040",
                          border: "2px solid #9B59B6",
                          color: "#E0C8FF",
                          fontSize: "8px",
                          lineHeight: 1.6,
                          fontFamily: "sans-serif",
                        }}
                      >
                        ▶ {c.text}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {phase === "guess" && (
                <>
                  <p style={{ color: "#FFE44D", fontSize: "9px", marginBottom: 10, textShadow: "0 0 6px #FFB800" }}>
                    MAKE YOUR CALL
                  </p>
                  {clues.length > 0 && (
                    <div className="mb-3 space-y-1">
                      <p style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.1em" }}>YOUR CLUES:</p>
                      {clues.map((cl, i) => (
                        <p key={i} style={{ color: "#C8A8E0", fontSize: "7px", fontFamily: "sans-serif", fontStyle: "italic" }}>• {cl}</p>
                      ))}
                    </div>
                  )}
                  <p style={{ color: "#E0C8FF", fontSize: "9px", marginBottom: 12, fontFamily: "sans-serif" }}>
                    Is {currentNPC.name} a real girl or a ladyboy?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleGuess(false)}
                      className="flex-1 py-2 font-black transition-all hover:brightness-125 active:scale-95"
                      style={{ background: "#1a4a1a", border: "3px solid #4CAF50", color: "#6FE87A", fontSize: "8px", boxShadow: "0 0 10px #4CAF5044", letterSpacing: "0.1em" }}
                    >
                      👧 REAL GIRL
                    </button>
                    <button
                      onClick={() => handleGuess(true)}
                      className="flex-1 py-2 font-black transition-all hover:brightness-125 active:scale-95"
                      style={{ background: "#4a1a1a", border: "3px solid #FF69B4", color: "#FF9ECC", fontSize: "8px", boxShadow: "0 0 10px #FF69B444", letterSpacing: "0.1em" }}
                    >
                      💅 LADYBOY
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── REVEAL overlay ─── */}
        {phase === "reveal" && currentNPC && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
            <div
              className="w-80 p-6 flex flex-col gap-4"
              style={{
                background: "#0a0018",
                border: `4px solid ${revealCorrect ? "#4CAF50" : "#FF4444"}`,
                boxShadow: `0 0 30px ${revealCorrect ? "#4CAF5088" : "#FF444488"}`,
              }}
            >
              <p
                className="text-center text-xl font-black"
                style={{
                  color: revealCorrect ? "#6FE87A" : "#FF6666",
                  textShadow: `0 0 10px ${revealCorrect ? "#4CAF50" : "#FF4444"}`,
                  letterSpacing: "0.2em",
                }}
              >
                {revealCorrect ? "✓ CORRECT!" : "✗ WRONG!"}
              </p>
              <p style={{ color: currentNPC.outfitColor, fontSize: "10px", textAlign: "center", textShadow: `0 0 6px ${currentNPC.outfitColor}` }}>
                {currentNPC.name.toUpperCase()} —{" "}
                <span style={{ color: "#FFE44D" }}>
                  {currentNPC.isLadyboy ? "LADYBOY" : "REAL GIRL"}
                </span>
              </p>
              <p style={{ color: "#C8A8E0", fontSize: "9px", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                {currentNPC.reveal}
              </p>
              <button
                onClick={continueAfterReveal}
                className="py-2 font-black transition-all hover:brightness-125"
                style={{
                  background: "#1a0040",
                  border: `2px solid ${meta.color}`,
                  color: meta.color,
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  boxShadow: `0 0 10px ${meta.color}44`,
                }}
              >
                CONTINUE ▶
              </button>
            </div>
          </div>
        )}

        {/* ── COMPLETE overlay ─── */}
        {phase === "complete" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div
              className="w-80 p-6 flex flex-col gap-4"
              style={{
                background: "#0a0018",
                border: `4px solid ${meta.color}`,
                boxShadow: `0 0 30px ${meta.glow}66`,
              }}
            >
              <p
                className="text-center text-lg font-black"
                style={{ color: meta.color, textShadow: `0 0 12px ${meta.glow}`, letterSpacing: "0.2em" }}
              >
                {meta.label} COMPLETE
              </p>
              <p className="text-center" style={{ color: "#FFE44D", fontSize: "22px", textShadow: "0 0 10px #FFB800" }}>
                {score}/{npcs.length}
              </p>
              <div className="space-y-1">
                {results.map((r, i) => (
                  <p key={i} style={{ fontSize: "8px", color: r.correct ? "#6FE87A" : "#FF6666" }}>
                    {r.correct ? "✓" : "✗"} {r.name.toUpperCase()}
                  </p>
                ))}
              </div>
              <p style={{ color: "#C8A8E0", fontSize: "8px", textAlign: "center", letterSpacing: "0.1em" }}>
                {score === npcs.length
                  ? "PERFECT SCORE — SHARP INSTINCTS!"
                  : score >= 2
                  ? "GOOD READ — ALMOST GOT IT!"
                  : "NEEDS WORK — LISTEN MORE CAREFULLY"}
              </p>
              <div className="flex gap-2">
                <Link
                  href="/game"
                  className="flex-1 py-2 text-center font-black transition-all hover:brightness-125"
                  style={{ background: "#0d0020", border: `2px solid ${meta.color}`, color: meta.color, fontSize: "8px", letterSpacing: "0.1em" }}
                >
                  ◀ MAP
                </Link>
                <button
                  onClick={() => {
                    setPhase("browse");
                    setScore(0);
                    setHearts(3);
                    setResults([]);
                    setDoneNPCs(new Set());
                    setNpcIndex(0);
                    setTurnIndex(0);
                    setClues([]);
                    setLatestClue(null);
                  }}
                  className="flex-1 py-2 font-black transition-all hover:brightness-125"
                  style={{ background: "#1a0040", border: `2px solid #FFE44D`, color: "#FFE44D", fontSize: "8px", letterSpacing: "0.1em" }}
                >
                  ↺ RETRY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── bottom bar ─────────────────────── */}
      <div
        className="relative z-10 h-8 flex items-center justify-center shrink-0"
        style={{ background: "#0d0020", borderTop: `2px solid ${meta.color}44` }}
      >
        <span style={{ color: "#9B59B6", fontSize: "7px", letterSpacing: "0.3em" }}>
          AGOGO ADVENTURE: THE GOLDEN ERA
        </span>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }

        @keyframes pixelBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .pixel-bob { animation: pixelBob 1.6s ease-in-out infinite; }

        @keyframes talkBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-3px); }
        }
        .talk-bounce { animation: talkBounce 0.8s ease-in-out infinite; }

        @keyframes flameFlicker {
          0%, 100% { transform: translateX(-50%) scaleX(1)   scaleY(1);    opacity: 1; }
          25%      { transform: translateX(-50%) scaleX(0.85) scaleY(1.1); opacity: 0.9; }
          50%      { transform: translateX(-50%) scaleX(1.1)  scaleY(0.95); opacity: 1; }
          75%      { transform: translateX(-50%) scaleX(0.9)  scaleY(1.05); opacity: 0.85; }
        }
        .torch-flame-outer > div:first-child { animation: flameFlicker 0.18s ease-in-out infinite; transform-origin: bottom center; }
        .torch-flame-outer > div:nth-child(2) { animation: flameFlicker 0.22s ease-in-out infinite 0.05s; transform-origin: bottom center; }
        .torch-flame-outer > div:nth-child(3) { animation: flameFlicker 0.15s ease-in-out infinite 0.03s; transform-origin: bottom center; }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -30%) scale(1); }
          50%      { opacity: 1.0; transform: translate(-50%, -30%) scale(1.15); }
        }
        .torch-glow { animation: glowPulse 0.3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}