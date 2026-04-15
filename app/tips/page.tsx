"use client";
import Link from "next/link";

const TIPS = [
  {
    icon: "👁️",
    title: "BROW RIDGE",
    difficulty: "EASY",
    diffColor: "#4CAF50",
    body: "Males typically have a more prominent brow ridge — a visible shelf above the eye sockets. Real girls tend to have a smoother, rounder forehead with little to no protrusion above the brows.",
  },
  {
    icon: "🦷",
    title: "JAW LINE",
    difficulty: "EASY",
    diffColor: "#4CAF50",
    body: "A square, angular jaw is a strong indicator of male bone structure. Female jaws are typically narrower and more rounded at the chin. Look at the jaw when she laughs or talks — it's harder to hide.",
  },
  {
    icon: "🍎",
    title: "ADAM'S APPLE",
    difficulty: "EASY",
    diffColor: "#4CAF50",
    body: "The larynx (voice box) grows larger in males during puberty, forming a visible bump on the throat. Real girls have a much smaller larynx. Look at the neck, especially when she swallows or tilts her head back.",
  },
  {
    icon: "📏",
    title: "HEIGHT",
    difficulty: "MEDIUM",
    diffColor: "#FF9800",
    body: "The average Thai woman stands around 155–160 cm. Many ladyboys are noticeably taller — often 165 cm or above — due to male bone growth before transition. Factor in heels when estimating.",
  },
  {
    icon: "🖐️",
    title: "HAND SIZE",
    difficulty: "MEDIUM",
    diffColor: "#FF9800",
    body: "Male hands are on average larger relative to body size, with longer ring fingers than index fingers (2D:4D ratio). Compare hand size to face size — a hand that covers most of the face suggests male proportions.",
  },
  {
    icon: "📐",
    title: "SHOULDER WIDTH",
    difficulty: "MEDIUM",
    diffColor: "#FF9800",
    body: "Male skeletons have broader shoulders relative to the hips. Real girls have a hip-to-shoulder ratio close to 1:1 or wider hips. Shoulders noticeably wider than the hips is a tell. Clothes can hide this — look when seated.",
  },
  {
    icon: "🗣️",
    title: "VOICE PITCH",
    difficulty: "MEDIUM",
    diffColor: "#FF9800",
    body: "Hormones can raise the voice significantly, but rarely fully to a female range. A slightly husky, breathy, or artificially high-pitched voice can indicate training. Listen during relaxed conversation — not just greeting you.",
  },
  {
    icon: "💆",
    title: "SKIN & HAIR",
    difficulty: "HARD",
    diffColor: "#DD192F",
    body: "Male skin tends to be thicker, with larger pores, and may show faint beard shadow under heavy makeup — especially around the jaw and upper lip. Look in direct light. Female skin is finer and more even in texture.",
  },
  {
    icon: "🦴",
    title: "NOSE BRIDGE",
    difficulty: "HARD",
    diffColor: "#DD192F",
    body: "Male skulls typically have a more prominent, wider nose bridge. Female noses tend to be smaller and more refined. Rhinoplasty is common, but the underlying bone structure around the nose can still give clues.",
  },
  {
    icon: "🧠",
    title: "THE VIBE",
    difficulty: "HARD",
    diffColor: "#DD192F",
    body: "Experience is the best teacher. Ladyboys often (not always) carry themselves with a studied femininity — slightly exaggerated mannerisms, very deliberate presentation. Real girls are often less 'performed'. Trust your gut — then verify.",
  },
];

const MYTHS = [
  { myth: "Ladyboys always look masculine", fact: "Not true — after hormones and surgery, many are indistinguishable to most people." },
  { myth: "You can always tell by the feet", fact: "Foot size overlaps heavily between Thai men and women. Not reliable." },
  { myth: "Makeup always hides the truth", fact: "Heavy makeup can obscure many cues — focus on bone structure instead." },
  { myth: "They will always tell you", fact: "Not necessarily in a bar setting. That's the whole point of the game." },
];

export default function TipsPage() {
  return (
    <div
      className="relative min-h-dvh w-screen overflow-x-hidden"
      style={{ fontFamily: "'Press Start 2P', monospace", background: "#05000a", color: "#fff" }}
    >
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.06]"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.6) 0px,rgba(0,0,0,0.6) 1px,transparent 1px,transparent 4px)" }} />

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3"
        style={{ background: "rgba(5,0,10,0.96)", borderBottom: "2px solid #FF69B444" }}>
        <Link href="/" style={{ fontSize: "clamp(7px,1vw,10px)", color: "#FF6E6E", letterSpacing: "0.15em", textDecoration: "none" }}>
          ◀ BACK
        </Link>
        <div style={{ fontSize: "clamp(9px,1.3vw,14px)", color: "#FFE44D", letterSpacing: "0.2em",
          textShadow: "0 0 10px #FFB800, 2px 2px 0 #5A2A00" }}>
          FIELD GUIDE
        </div>
        <Link href="/wardrobe" style={{ fontSize: "clamp(7px,1vw,10px)", color: "#FF69B4", letterSpacing: "0.1em", textDecoration: "none" }}>
          PLAY ▶
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-10">

        {/* Intro */}
        <div className="text-center flex flex-col gap-3">
          <div style={{ fontSize: "clamp(18px,4vw,32px)", color: "#FFE44D",
            textShadow: "0 0 16px #FFB800, 3px 3px 0 #5A2A00", letterSpacing: "0.1em" }}>
            GIRL OR LADYBOY?
          </div>
          <div style={{ fontSize: "clamp(8px,1.1vw,12px)", color: "#FF69B4", letterSpacing: "0.15em" }}>
            THE UNOFFICIAL SPOTTER&apos;S GUIDE
          </div>
          <p style={{ fontSize: "clamp(7px,0.9vw,10px)", color: "#888", lineHeight: 2.2,
            letterSpacing: "0.08em", maxWidth: 560, margin: "0 auto", fontFamily: "sans-serif",
            fontStyle: "italic" }}>
            Thailand has a long cultural history of a &quot;third gender&quot; — kathoey (กะเทย), known
            internationally as ladyboys. With modern hormones and surgery, telling the difference
            takes a trained eye. These are the clues to look for.
          </p>
        </div>

        {/* Difficulty legend */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {[
            { label: "EASY",   color: "#4CAF50" },
            { label: "MEDIUM", color: "#FF9800" },
            { label: "HARD",   color: "#DD192F" },
          ].map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <div style={{ width: 10, height: 10, background: d.color, border: "1px solid #ffffff33" }} />
              <span style={{ fontSize: "7px", color: "#aaa", letterSpacing: "0.15em" }}>{d.label} TO SPOT</span>
            </div>
          ))}
        </div>

        {/* Tips grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
          {TIPS.map((tip, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `2px solid ${tip.diffColor}44`,
                boxShadow: `0 0 16px ${tip.diffColor}11`,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 22 }}>{tip.icon}</span>
                  <span style={{ fontSize: "clamp(8px,1vw,11px)", color: "#FFE44D", letterSpacing: "0.1em" }}>
                    {tip.title}
                  </span>
                </div>
                <span style={{
                  fontSize: "6px", padding: "3px 7px",
                  background: `${tip.diffColor}22`,
                  border: `1px solid ${tip.diffColor}`,
                  color: tip.diffColor, letterSpacing: "0.15em",
                }}>
                  {tip.difficulty}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(90deg, ${tip.diffColor}66, transparent)` }} />

              {/* Body */}
              <p style={{
                fontSize: "clamp(8px,0.9vw,11px)", color: "#C8B8D0", lineHeight: 2,
                fontFamily: "sans-serif", fontStyle: "normal", margin: 0,
              }}>
                {tip.body}
              </p>
            </div>
          ))}
        </div>

        {/* Common myths */}
        <div className="flex flex-col gap-4">
          <div style={{ fontSize: "clamp(10px,1.3vw,14px)", color: "#FF69B4", letterSpacing: "0.2em",
            textShadow: "0 0 10px #FF69B455" }}>
            ✕ COMMON MYTHS
          </div>
          <div className="flex flex-col gap-3">
            {MYTHS.map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,105,180,0.05)",
                border: "1px solid #FF69B433",
                padding: "14px 16px",
                display: "flex", flexDirection: "column", gap: 6,
              }}>
                <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#FF6E6E", letterSpacing: "0.1em" }}>
                  MYTH: &quot;{m.myth}&quot;
                </div>
                <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#8BC34A", letterSpacing: "0.08em", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                  FACT: {m.fact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          border: "1px solid #ffffff22", padding: "16px 18px",
          background: "rgba(255,255,255,0.02)",
        }}>
          <p style={{ fontSize: "clamp(7px,0.8vw,9px)", color: "#ffffff55", lineHeight: 2.2,
            fontFamily: "sans-serif", margin: 0, letterSpacing: "0.05em" }}>
            This guide is presented in the context of a satirical adult game inspired by real
            Bangkok nightlife culture. It is intended to be educational and humorous — not
            to demean or marginalise anyone. Kathoey are a respected part of Thai culture
            with a history spanning centuries. The game is a test of observation, not judgement.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
          <Link href="/wardrobe"
            style={{
              fontSize: "clamp(9px,1.2vw,13px)", padding: "16px 32px",
              background: "linear-gradient(180deg,#4A043A,#100008)",
              border: "3px solid #FF69B4", color: "#FF69B4",
              textDecoration: "none", letterSpacing: "0.2em",
              boxShadow: "0 0 20px #FF69B444, 3px 3px 0 #2a0018",
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            ▶ START GAME
          </Link>
          <Link href="/story"
            style={{
              fontSize: "clamp(8px,1vw,11px)", padding: "14px 24px",
              background: "transparent", border: "2px solid #FFE44D55",
              color: "#FFE44D88", textDecoration: "none", letterSpacing: "0.15em",
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            📖 READ STORY
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
