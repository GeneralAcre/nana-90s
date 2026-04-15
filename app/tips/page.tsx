"use client";
import Link from "next/link";

const SECTIONS = [
  {
    difficulty: "EASY TO SPOT",
    color: "#4CAF50",
    glow:  "#4CAF5066",
    tips: [
      {
        title: "ADAM'S APPLE",
        body:  "The larynx grows larger in males during puberty, forming a visible bump on the throat. Real girls have a much smaller one. Look at the neck — especially when she laughs or tilts her head back.",
      },
      {
        title: "JAW LINE",
        body:  "A square, angular jaw is a strong indicator of male bone structure. Female jaws are narrower and more rounded at the chin. Watch the jaw when she talks — it is harder to hide in motion.",
      },
      {
        title: "BROW RIDGE",
        body:  "Males typically have a more prominent brow ridge — a visible shelf above the eye sockets. Real girls tend to have a smoother, rounder forehead with little to no protrusion above the brows.",
      },
    ],
  },
  {
    difficulty: "MODERATE",
    color: "#FF9800",
    glow:  "#FF980066",
    tips: [
      {
        title: "HEIGHT",
        body:  "The average Thai woman stands around 155–160 cm. Many ladyboys are noticeably taller due to male bone growth before transition. Factor in heels when estimating real height.",
      },
      {
        title: "SHOULDER WIDTH",
        body:  "Male skeletons have broader shoulders relative to the hips. Real girls have a hip-to-shoulder ratio close to 1:1 or wider hips. Clothes can hide this — look when she is seated.",
      },
      {
        title: "HAND SIZE",
        body:  "Male hands are larger relative to body size. Compare hand size to face size — a hand that covers most of the face suggests male proportions. Also check finger length ratios.",
      },
      {
        title: "VOICE PITCH",
        body:  "Hormones can raise the voice, but rarely fully to a female range. A husky, breathy, or artificially high pitch can indicate voice training. Listen during relaxed conversation — not just a greeting.",
      },
    ],
  },
  {
    difficulty: "HARD TO SPOT",
    color: "#DD192F",
    glow:  "#DD192F66",
    tips: [
      {
        title: "SKIN TEXTURE",
        body:  "Male skin tends to be thicker with larger pores, and may show faint beard shadow under heavy makeup — especially around the jaw and upper lip. Look in direct light. Female skin is finer and more even.",
      },
      {
        title: "NOSE BRIDGE",
        body:  "Male skulls typically have a wider, more prominent nose bridge. Female noses tend to be smaller and more refined. Surgery is common, but the surrounding bone structure can still give clues.",
      },
      {
        title: "THE VIBE",
        body:  "Experience is the best teacher. Ladyboys often carry themselves with a studied femininity — slightly exaggerated mannerisms, very deliberate presentation. Real girls are often less performed. Trust your gut, then verify.",
      },
    ],
  },
];

const MYTHS = [
  { x: "Ladyboys always look masculine",   check: "After hormones and surgery, many are indistinguishable to most people." },
  { x: "You can always tell by the feet",  check: "Foot size overlaps heavily between Thai men and women. Not reliable." },
  { x: "Makeup always hides the truth",    check: "Heavy makeup obscures many cues — focus on bone structure instead." },
  { x: "They will always tell you",        check: "Not necessarily in a bar setting. That is the whole point of the game." },
];

export default function TipsPage() {
  return (
    <div
      className="relative min-h-dvh w-screen overflow-x-hidden"
      style={{ fontFamily: "'Press Start 2P', monospace", background: "#08000f", color: "#fff" }}
    >
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.07]"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.5) 0px,rgba(0,0,0,0.5) 1px,transparent 1px,transparent 4px)" }} />

      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4"
        style={{ background: "rgba(8,0,15,0.97)", borderBottom: "3px solid #FF69B444" }}>
        <Link href="/" style={{ fontSize: "clamp(7px,1vw,10px)", color: "#FF6E6E", letterSpacing: "0.15em", textDecoration: "none" }}>
          ◀ BACK
        </Link>
        <div style={{ fontSize: "clamp(10px,1.4vw,15px)", color: "#FFE44D", letterSpacing: "0.25em",
          textShadow: "0 0 12px #FFB800, 2px 2px 0 #5A2A00" }}>
          FIELD GUIDE
        </div>
        <Link href="/wardrobe" style={{ fontSize: "clamp(7px,1vw,10px)", color: "#FF69B4", letterSpacing: "0.1em", textDecoration: "none" }}>
          PLAY ▶
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-12">

        {/* Title block */}
        <div className="flex flex-col gap-4 text-center">
          <div style={{ fontSize: "clamp(22px,5vw,40px)", color: "#FFE44D",
            textShadow: "0 0 20px #FFB800, 3px 3px 0 #5A2A00", letterSpacing: "0.1em", lineHeight: 1.3 }}>
            GIRL OR<br />LADYBOY?
          </div>
          <div style={{ fontSize: "clamp(8px,1.1vw,11px)", color: "#FF69B4", letterSpacing: "0.2em" }}>
            THE SPOTTER&apos;S FIELD GUIDE
          </div>
          <div style={{ width: 60, height: 3, background: "#FF69B4", margin: "4px auto",
            boxShadow: "0 0 12px #FF69B4" }} />
          <p style={{ fontSize: "clamp(10px,1.3vw,14px)", color: "#bbb", lineHeight: 2,
            letterSpacing: "0.03em", maxWidth: 520, margin: "0 auto", fontFamily: "sans-serif" }}>
            Thailand has a long cultural history of a third gender — kathoey, known internationally
            as ladyboys. With modern hormones and surgery, telling the difference takes a trained eye.
          </p>
        </div>

        {/* Tip sections */}
        {SECTIONS.map((section) => (
          <div key={section.difficulty} className="flex flex-col gap-5">

            {/* Section header */}
            <div className="flex items-center gap-4">
              <div style={{ width: 14, height: 14, background: section.color,
                boxShadow: `0 0 10px ${section.color}`, flexShrink: 0 }} />
              <div style={{ fontSize: "clamp(10px,1.3vw,14px)", color: section.color,
                letterSpacing: "0.25em", textShadow: `0 0 12px ${section.glow}` }}>
                {section.difficulty}
              </div>
              <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${section.color}88, transparent)` }} />
            </div>

            {/* Tips list */}
            <div className="flex flex-col gap-3">
              {section.tips.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft:  `4px solid ${section.color}`,
                    background:  `linear-gradient(90deg, ${section.color}10 0%, rgba(0,0,0,0.3) 40%)`,
                    padding:     "18px 20px",
                    display:     "flex",
                    flexDirection: "column",
                    gap:         10,
                  }}
                >
                  <div style={{ fontSize: "clamp(9px,1.1vw,12px)", color: "#fff",
                    letterSpacing: "0.15em" }}>
                    {String(i + 1).padStart(2, "0")}. {tip.title}
                  </div>
                  <p style={{ fontSize: "clamp(11px,1.3vw,14px)", color: "#C8C0D8",
                    lineHeight: 1.9, fontFamily: "sans-serif", margin: 0 }}>
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Myths section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div style={{ width: 14, height: 14, background: "#9B59B6",
              boxShadow: "0 0 10px #9B59B6", flexShrink: 0 }} />
            <div style={{ fontSize: "clamp(10px,1.3vw,14px)", color: "#9B59B6",
              letterSpacing: "0.25em", textShadow: "0 0 12px #9B59B666" }}>
              COMMON MYTHS
            </div>
            <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#9B59B688,transparent)" }} />
          </div>

          <div className="flex flex-col gap-3">
            {MYTHS.map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: "2px solid #ffffff18",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, background: "#DD192F",
                    color: "#fff", fontSize: "9px", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 2, letterSpacing: 0 }}>
                    X
                  </div>
                  <div style={{ fontSize: "clamp(9px,1.1vw,12px)", color: "#FF8888",
                    letterSpacing: "0.08em", lineHeight: 1.8 }}>
                    {m.x}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingLeft: 28 }}>
                  <p style={{ fontSize: "clamp(11px,1.3vw,14px)", color: "#9DC89D",
                    lineHeight: 1.8, fontFamily: "sans-serif", margin: 0 }}>
                    {m.check}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ borderLeft: "3px solid #ffffff22", paddingLeft: 18 }}>
          <p style={{ fontSize: "clamp(10px,1.2vw,13px)", color: "#666",
            lineHeight: 2, fontFamily: "sans-serif", margin: 0 }}>
            This guide is part of a satirical game inspired by Bangkok nightlife culture.
            It is intended to be educational and humorous — not to demean anyone.
            Kathoey are a respected part of Thai culture with a history spanning centuries.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-6">
          <Link href="/wardrobe"
            style={{
              fontSize: "clamp(10px,1.3vw,14px)", padding: "18px 36px",
              background: "linear-gradient(180deg,#4A043A,#100008)",
              border: "3px solid #FF69B4", color: "#FF69B4",
              textDecoration: "none", letterSpacing: "0.2em",
              boxShadow: "0 0 24px #FF69B455, 4px 4px 0 #2a0018",
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            ▶ START GAME
          </Link>
          <Link href="/story"
            style={{
              fontSize: "clamp(8px,1vw,11px)", padding: "16px 26px",
              background: "transparent", border: "2px solid #FFE44D55",
              color: "#FFE44Daa", textDecoration: "none", letterSpacing: "0.15em",
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            READ STORY
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
