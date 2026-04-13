"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "../context/GameContext";
import { supabase, Room } from "../lib/supabase";

const STORES = ["playboy", "obsession", "spectrum", "dollhouse", "candybar", "rainbow"];

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function Blink({ children, ms = 600 }: { children: React.ReactNode; ms?: number }) {
  const [v, setV] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setV(s => !s), ms);
    return () => clearInterval(t);
  }, [ms]);
  return <span style={{ visibility: v ? "visible" : "hidden" }}>{children}</span>;
}

type Status = "idle" | "creating" | "waiting" | "joining" | "error";

export default function OnlinePage() {
  const router = useRouter();
  const { suitColor, setRoomCode, setOnlinePlayer, setPlayer2Color, setPlayerCount } = useGame();

  const [status,      setStatus]      = useState<Status>("idle");
  const [createdCode, setCreatedCode] = useState("");
  const [joinInput,   setJoinInput]   = useState("");
  const [errorMsg,    setErrorMsg]    = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up poll on unmount
  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Poll for P2 joining while in waiting state
  useEffect(() => {
    if (status !== "waiting" || !createdCode) return;

    const poll = setInterval(async () => {
      const { data } = await supabase
        .from("rooms").select("*").eq("code", createdCode).single<Room>();
      if (data?.p2_suit_color) {
        clearInterval(poll);
        pollRef.current = null;
        setPlayer2Color(data.p2_suit_color);
        router.push(`/game/${data.store}`);
      }
    }, 2000);

    pollRef.current = poll;
    return () => clearInterval(poll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, createdCode]);

  async function createRoom() {
    setStatus("creating");
    setErrorMsg("");

    const code  = randomCode();
    const store = STORES[Math.floor(Math.random() * STORES.length)];

    const { error } = await supabase.from("rooms").insert({
      code,
      store,
      p1_suit_color: suitColor,
    });

    if (error) {
      setErrorMsg("Could not create room. Try again.");
      setStatus("error");
      return;
    }

    setCreatedCode(code);
    setRoomCode(code);
    setOnlinePlayer(1);
    setPlayerCount(1);
    setStatus("waiting");
    // polling is started by the useEffect above
  }

  async function joinRoom() {
    const code = joinInput.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
    if (code.length !== 4) {
      setErrorMsg("Enter a 4-letter room code.");
      setStatus("error");
      return;
    }

    setStatus("joining");
    setErrorMsg("");

    // Fetch the room
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", code)
      .single<Room>();

    if (error || !data) {
      setErrorMsg(`Room "${code}" not found.`);
      setStatus("error");
      return;
    }
    if (data.p2_suit_color) {
      setErrorMsg("Room is already full.");
      setStatus("error");
      return;
    }

    // Join: write P2's color
    const { error: joinErr } = await supabase
      .from("rooms")
      .update({ p2_suit_color: suitColor })
      .eq("code", code);

    if (joinErr) {
      setErrorMsg("Failed to join. Try again.");
      setStatus("error");
      return;
    }

    // Set context for P2
    setRoomCode(code);
    setOnlinePlayer(2);
    setPlayerCount(1);
    setPlayer2Color(data.p1_suit_color); // P1's color is "opponent" for P2

    router.push(`/game/${data.store}`);
  }

  const T = {
    gold:    "#FAC335",
    pink:    "#FF69B4",
    purple:  "#C060FF",
    mauve:   "#482D40",
  };

  return (
    <div
      className="relative h-dvh w-screen overflow-hidden select-none flex flex-col"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nana-plaza.png"
          alt=""
          fill
          className="object-cover"
          style={{ imageRendering: "pixelated" }}
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,0,8,0.88)" }} />
        <div className="absolute inset-0 pointer-events-none scanlines" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <Link
          href="/wardrobe"
          className="flex items-center gap-2 font-black"
          style={{ color: "#FF6E6E", fontSize: "clamp(8px,1.2vw,11px)", letterSpacing: "0.15em" }}
        >
          ◀ BACK
        </Link>
        <h1
          className="font-black uppercase"
          style={{
            fontSize:   "clamp(12px,2vw,20px)",
            color:      T.gold,
            textShadow: `0 0 12px ${T.gold}, 2px 2px 0 #5A2A00`,
            letterSpacing: "0.2em",
          }}
        >
          ONLINE BATTLE
        </h1>
        <div style={{ width: 60 }} />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 px-6">

        {/* ── WAITING STATE ── */}
        {status === "waiting" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div style={{ fontSize: "clamp(12px,2vw,18px)", color: T.gold, letterSpacing: "0.15em" }}>
              ROOM CREATED!
            </div>
            <div style={{ fontSize: "clamp(9px,1.2vw,13px)", color: "#aaa", letterSpacing: "0.2em", lineHeight: 2 }}>
              SHARE THIS CODE WITH YOUR FRIEND
            </div>

            {/* Big code display */}
            <div
              style={{
                fontSize:   "clamp(36px,8vw,72px)",
                color:      T.gold,
                letterSpacing: "0.3em",
                textShadow: `0 0 24px ${T.gold}, 4px 4px 0 #5A2A00`,
                border:     `3px solid ${T.gold}`,
                padding:    "16px 32px",
                background: "rgba(0,0,0,0.8)",
              }}
            >
              {createdCode}
            </div>

            <div style={{ fontSize: "clamp(8px,1vw,11px)", color: "#888", letterSpacing: "0.2em" }}>
              <Blink ms={700}>WAITING FOR PLAYER 2...</Blink>
            </div>

            <button
              onClick={() => {
                if (pollRef.current) clearInterval(pollRef.current);
                setStatus("idle");
                setCreatedCode("");
                setRoomCode(null);
                setOnlinePlayer(null);
              }}
              style={{
                marginTop:  8,
                fontSize:   "clamp(7px,0.9vw,10px)",
                color:      "#888",
                background: "none",
                border:     "1px solid #333",
                cursor:     "pointer",
                padding:    "6px 14px",
                letterSpacing: "0.1em",
              }}
            >
              CANCEL
            </button>
          </div>
        )}

        {/* ── IDLE / ERROR STATE ── */}
        {(status === "idle" || status === "creating" || status === "joining" || status === "error") && (
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">

            {/* CREATE panel */}
            <div
              className="flex-1 flex flex-col items-center gap-4 p-6"
              style={{
                background: "rgba(0,0,0,0.7)",
                border:     `2px solid ${T.gold}`,
                boxShadow:  `0 0 20px ${T.gold}33`,
              }}
            >
              <div style={{ fontSize: "clamp(9px,1.1vw,12px)", color: T.gold, letterSpacing: "0.2em" }}>
                CREATE ROOM
              </div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#888", letterSpacing: "0.1em", textAlign: "center", lineHeight: 2 }}>
                START A ROOM AND SHARE<br />THE CODE WITH A FRIEND
              </div>
              <button
                onClick={createRoom}
                disabled={status === "creating" || status === "joining"}
                style={{
                  marginTop:  8,
                  fontSize:   "clamp(9px,1.1vw,13px)",
                  fontFamily: "'Press Start 2P', monospace",
                  padding:    "14px 28px",
                  background: `linear-gradient(180deg, #5A2A00, #2a1200)`,
                  border:     `3px solid ${T.gold}`,
                  color:      T.gold,
                  cursor:     "pointer",
                  letterSpacing: "0.15em",
                  boxShadow:  `0 0 16px ${T.gold}55`,
                  opacity:    status === "creating" ? 0.6 : 1,
                }}
              >
                {status === "creating" ? "CREATING..." : "▶ CREATE"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex md:flex-col items-center justify-center">
              <div style={{ color: "#555", fontSize: "clamp(9px,1.1vw,13px)", letterSpacing: "0.2em" }}>VS</div>
            </div>

            {/* JOIN panel */}
            <div
              className="flex-1 flex flex-col items-center gap-4 p-6"
              style={{
                background: "rgba(0,0,0,0.7)",
                border:     `2px solid ${T.purple}`,
                boxShadow:  `0 0 20px ${T.purple}33`,
              }}
            >
              <div style={{ fontSize: "clamp(9px,1.1vw,12px)", color: T.purple, letterSpacing: "0.2em" }}>
                JOIN ROOM
              </div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#888", letterSpacing: "0.1em", textAlign: "center", lineHeight: 2 }}>
                ENTER YOUR FRIEND&apos;S<br />4-LETTER CODE
              </div>

              <input
                type="text"
                value={joinInput}
                onChange={e => setJoinInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4))}
                onKeyDown={e => { if (e.key === "Enter") joinRoom(); }}
                placeholder="ABCD"
                maxLength={4}
                style={{
                  width:      "100%",
                  fontSize:   "clamp(20px,4vw,32px)",
                  fontFamily: "'Press Start 2P', monospace",
                  textAlign:  "center",
                  letterSpacing: "0.3em",
                  background: "#0a0006",
                  border:     `2px solid ${T.purple}`,
                  color:      T.purple,
                  padding:    "10px 8px",
                  outline:    "none",
                  caretColor: T.purple,
                }}
              />

              <button
                onClick={joinRoom}
                disabled={status === "joining" || status === "creating" || joinInput.length !== 4}
                style={{
                  fontSize:   "clamp(9px,1.1vw,13px)",
                  fontFamily: "'Press Start 2P', monospace",
                  padding:    "14px 28px",
                  background: `linear-gradient(180deg, #200040, #0a0020)`,
                  border:     `3px solid ${T.purple}`,
                  color:      T.purple,
                  cursor:     joinInput.length === 4 ? "pointer" : "not-allowed",
                  letterSpacing: "0.15em",
                  boxShadow:  `0 0 16px ${T.purple}55`,
                  opacity:    (status === "joining" || joinInput.length !== 4) ? 0.5 : 1,
                }}
              >
                {status === "joining" ? "JOINING..." : "▶ JOIN"}
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {status === "error" && errorMsg && (
          <div style={{ color: "#FF4444", fontSize: "clamp(8px,1vw,11px)", letterSpacing: "0.15em", textAlign: "center" }}>
            ✕ {errorMsg}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 shrink-0 py-3 text-center" style={{ borderTop: "1px solid #ffffff22" }}>
        <div style={{ color: "#ffffff44", fontSize: "7px", letterSpacing: "0.2em" }}>
          BOTH PLAYERS PLAY THE SAME BAR · SCORES COMPARED AT THE END
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
