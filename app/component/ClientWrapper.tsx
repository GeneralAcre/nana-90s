"use client";

import { GameProvider } from "../context/GameContext";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

function getTrack(pathname: string): "landing" | "game" | null {
  if (pathname === "/" || pathname === "/wardrobe" || pathname === "/online" || pathname === "/story" || pathname === "/tips") return "landing";
  if (pathname === "/game" || pathname.startsWith("/game/")) return "game";
  return null;
}

function MusicController() {
  const pathname     = usePathname();
  const landingRef   = useRef<HTMLAudioElement | null>(null);
  const gameRef      = useRef<HTMLAudioElement | null>(null);
  // Tracks which audio should be unmuted after async play() resolves
  const desiredRef   = useRef<"landing" | "game" | null>(null);
  const [tick, setTick] = useState(0); // force re-render for button icon

  // Create both Audio elements once on mount
  useEffect(() => {
    const landing  = new Audio("/Nana_After_Midnight.mp3");
    landing.loop   = true;
    landing.volume = 0.55;
    landingRef.current = landing;

    const game  = new Audio("/nana-music.mp3");
    game.loop   = true;
    game.volume = 0.55;
    gameRef.current = game;

    return () => {
      landing.pause(); landing.src = "";
      game.pause();    game.src    = "";
    };
  }, []);

  // Switch tracks whenever the route changes
  useEffect(() => {
    const landing = landingRef.current;
    const game    = gameRef.current;
    if (!landing || !game) return;

    const track = getTrack(pathname);
    desiredRef.current = track;

    // Always stop the track that should NOT be playing
    if (track !== "landing") landing.pause();
    if (track !== "game")    game.pause();

    const audio = track === "landing" ? landing : track === "game" ? game : null;
    if (!audio || !audio.paused) { setTick(t => t + 1); return; }

    // Try direct play first; fall back to muted-autoplay trick if blocked
    audio.play().then(() => {
      setTick(t => t + 1);
    }).catch(() => {
      audio.muted = true;
      audio.play().then(() => {
        // Only unmute if this track is still the desired one
        if (desiredRef.current === track) audio.muted = false;
        setTick(t => t + 1);
      }).catch(() => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function toggleMusic() {
    const track = getTrack(pathname);
    const audio = track === "landing" ? landingRef.current
                : track === "game"    ? gameRef.current
                : null;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setTick(t => t + 1)).catch(() => {});
    } else {
      audio.pause();
      setTick(t => t + 1);
    }
  }

  // Button only on game pages
  const isGameRoute = pathname === "/game" || pathname.startsWith("/game/");
  if (!isGameRoute) return null;

  // Read live state (tick forces re-render so icon stays accurate)
  void tick;
  const isPlaying = gameRef.current ? !gameRef.current.paused : false;

  return (
    <button
      onClick={toggleMusic}
      style={{
        position: "fixed", top: 10, right: 12, zIndex: 200,
        background: "rgba(0,0,0,0.75)", border: "2px solid #FF69B4",
        color: "#fff", borderRadius: 0, cursor: "pointer",
        padding: "5px 9px", fontFamily: "'Press Start 2P', monospace",
        fontSize: 12, lineHeight: 1,
        boxShadow: "0 0 10px #FF69B455",
      }}
    >
      {isPlaying ? "🔊" : "🔇"}
    </button>
  );
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <BackgroundScene />
      <MusicController />

      {/* UI Pages */}
      <div className="relative z-20 w-screen h-screen pointer-events-auto">
        {children}
      </div>

      {/* CRT Filter */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-size-[100%_4px,3px_100%]"
      />
    </GameProvider>
  );
}
