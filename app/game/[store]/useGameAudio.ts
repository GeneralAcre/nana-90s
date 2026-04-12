"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Thailish text processor ───────────────────────────────
// Generates a "speak" version of the line that sounds like
// a Thai bar girl speaking English: adds ka/na ka particles,
// expands contractions so TTS reads them cleanly, inserts
// natural Isaan-style rhythm pauses.
function thaiify(raw: string): string {
  const already = /\b(ka|kha|na ka|na kha|naka|น่ะค่ะ)\b/i.test(raw);

  let t = raw
    // Expand contractions — TTS pronounces them more naturally when spelled out
    .replace(/\bI'm\b/g,    "I am")
    .replace(/\bI've\b/g,   "I have")
    .replace(/\bI'll\b/g,   "I will")
    .replace(/\bI'd\b/g,    "I would")
    .replace(/\bdon't\b/g,  "do not")
    .replace(/\bcan't\b/g,  "can not")
    .replace(/\bwon't\b/g,  "will not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bwhat's\b/g, "what is")
    .replace(/\bit's\b/g,   "it is")
    .replace(/\bthat's\b/g, "that is")
    .replace(/\bwe're\b/g,  "we are")
    .replace(/\byou're\b/g, "you are")
    .replace(/\bthere's\b/g,"there is")
    // Em-dash → short breath pause
    .replace(/\s*—\s*/g, ", ")
    // Ellipsis → deliberate thinking pause with filler "na"
    .replace(/\.{3}/g, " .... na ....")
    // Add micro-pause before conjunctions so speech doesn't run together
    .replace(/\b(because|but|so|when|after|before|every|already|always)\b/gi, ", $1");

  if (!already) {
    t = t
      .replace(/([.])(\s*)$/,  " ka.$2")
      .replace(/([!])(\s*)$/,  " ka~!$2")
      .replace(/([?])(\s*)$/,  " na ka?$2");
  }

  return t;
}

// Per-NPC voice variation — deterministic from id
function npcVariation(npcId: string): { pitchAdd: number; rateMul: number } {
  let h = 0;
  for (let i = 0; i < npcId.length; i++) h = (h * 31 + npcId.charCodeAt(i)) & 0xffff;
  return {
    pitchAdd: ((h % 9) - 4) * 0.04,   // ±0.16
    rateMul:  1 + ((h % 7) - 3) * 0.02, // ±0.06
  };
}

// ─────────────────────────────────────────────────────────
export function useGameAudio() {
  const [muted, setMuted] = useState(false);
  const ctxRef   = useRef<AudioContext | null>(null);
  const ambRef   = useRef<{ stop: () => void } | null>(null);
  const mutedRef = useRef(false);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  function getCtx(): AudioContext {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }

  // ── Voice selection (cached after first load) ────────────
  const voiceCacheRef = useRef<SpeechSynthesisVoice | null | undefined>(undefined);

  function pickVoice(): SpeechSynthesisVoice | null {
    if (voiceCacheRef.current !== undefined) return voiceCacheRef.current;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null; // not loaded yet

    // Priority order — Thai female first, then English feminine voices
    const pick =
      // Thai female voice (Windows: "Microsoft Ayasha", Chrome: "Google ภาษาไทย")
      voices.find(v => v.lang.startsWith("th") && /female|woman|ayasha|ภาษา/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith("th")) ||
      // Well-known feminine English voices (Windows / macOS / Android)
      voices.find(v => /zira/i.test(v.name)) ||
      voices.find(v => /samantha/i.test(v.name)) ||
      voices.find(v => /karen/i.test(v.name)) ||
      voices.find(v => /moira/i.test(v.name)) ||
      voices.find(v => /tessa/i.test(v.name)) ||
      voices.find(v => /fiona/i.test(v.name)) ||
      voices.find(v => /victoria/i.test(v.name)) ||
      voices.find(v => /alice/i.test(v.name)) ||
      voices.find(v => /female|woman/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith("en")) ||
      voices[0];

    voiceCacheRef.current = pick ?? null;
    return voiceCacheRef.current;
  }

  // ── Speak NPC dialogue line ───────────────────────────────
  // Returns estimated charMs so typewriter can tick at same pace
  const playVoiceLine = useCallback((text: string, npcId = ""): number => {
    if (mutedRef.current) return 95;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return 95;

    window.speechSynthesis.cancel();

    const speakText = thaiify(text);
    const utter = new SpeechSynthesisUtterance(speakText);
    const { pitchAdd, rateMul } = npcVariation(npcId);

    // Clear, natural-paced English with Thai rhythm — TTS stays intelligible above 0.78
    utter.rate   = 0.80 * rateMul;
    utter.pitch  = 1.18 + pitchAdd;
    utter.volume = 0.95;

    const doSpeak = () => {
      const voice = pickVoice();
      if (voice) {
        utter.voice = voice;
        // If Thai voice: lang already set; for English voices keep default lang
        // so "ka" is pronounced correctly by English phonology
        if (voice.lang.startsWith("th")) utter.lang = "th-TH";
      }
      window.speechSynthesis.speak(utter);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
    }

    // Typewriter at ~10 chars/sec — matches 0.80 speech rate
    return 95;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopVoice = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // ── Ambient bar loop ─────────────────────────────────────
  const startAmbient = useCallback(() => {
    if (mutedRef.current || ambRef.current) return;
    const ctx = getCtx();

    const master = ctx.createGain();
    master.gain.value = 0.065;
    master.connect(ctx.destination);

    // Crowd murmur (looped filtered noise)
    const sr = ctx.sampleRate;
    const nBuf = ctx.createBuffer(1, sr * 3, sr);
    const nd   = nBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = nBuf; nSrc.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 640;
    const nGain = ctx.createGain(); nGain.gain.value = 0.28;
    nSrc.connect(lp); lp.connect(nGain); nGain.connect(master);
    nSrc.start();

    // Kick + hi-hat at 120 BPM
    let next = ctx.currentTime + 0.05;
    let count = 0;
    const beat = 60 / 120;

    function kick(t: number) {
      const o = ctx.createOscillator(); o.type = "sine";
      const g = ctx.createGain();
      o.frequency.setValueAtTime(125, t);
      o.frequency.exponentialRampToValueAtTime(36, t + 0.1);
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.2);
    }
    function hat(t: number, accent: boolean) {
      const hb = ctx.createBuffer(1, Math.floor(sr * 0.03), sr);
      const hd = hb.getChannelData(0);
      for (let i = 0; i < hd.length; i++) hd[i] = Math.random() * 2 - 1;
      const hs = ctx.createBufferSource(); hs.buffer = hb;
      const hf = ctx.createBiquadFilter(); hf.type = "highpass"; hf.frequency.value = 7500;
      const hg = ctx.createGain();
      hg.gain.setValueAtTime(accent ? 0.10 : 0.05, t);
      hg.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      hs.connect(hf); hf.connect(hg); hg.connect(master); hs.start(t);
    }

    const id = setInterval(() => {
      while (next < ctx.currentTime + 0.55) {
        const b = count % 8;
        if (b === 0 || b === 4) kick(next);
        hat(next, b % 2 === 0);
        next += beat; count++;
      }
    }, 200);

    ambRef.current = {
      stop() {
        clearInterval(id);
        try { nSrc.stop(); } catch { /* */ }
        master.disconnect();
        ambRef.current = null;
      },
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopAmbient = useCallback(() => { ambRef.current?.stop(); }, []);

  // ── UI click blip ────────────────────────────────────────
  const playClick = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.09, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.06);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reveal stabs ─────────────────────────────────────────
  const playReveal = useCallback((correct: boolean) => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    if (correct) {
      [523, 659, 784, 1047].forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine"; o.frequency.value = f;
        const t = ctx.currentTime + i * 0.09;
        g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.25);
      });
    } else {
      [220, 185, 155].forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sawtooth"; o.frequency.value = f;
        const t = ctx.currentTime + i * 0.13;
        g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.32);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Victory / Loss ───────────────────────────────────────
  const playVictory = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    [523, 659, 784, 659, 784, 1047, 1047].forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "square"; o.frequency.value = f;
      const t = ctx.currentTime + i * 0.13;
      g.gain.setValueAtTime(0.11, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.25);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playLoss = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    [392, 349, 330, 294, 262].forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "triangle"; o.frequency.value = f;
      const t = ctx.currentTime + i * 0.17;
      g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.38);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mute ─────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    setMuted(m => {
      if (!m) {
        window.speechSynthesis?.cancel();
        ambRef.current?.stop();
      }
      return !m;
    });
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      ambRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return {
    muted, toggleMute,
    startAmbient, stopAmbient,
    playVoiceLine, stopVoice,
    playClick, playReveal, playVictory, playLoss,
  };
}
