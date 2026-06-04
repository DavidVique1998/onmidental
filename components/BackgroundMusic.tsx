"use client";

import { useRef, useState, useEffect } from "react";

// Gymnopedie No 1 — Kevin MacLeod (incompetech.com) CC BY 4.0
const MUSIC_SRC = "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Gymnopedie%20No%201.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
      } else {
        audio.volume = 0.35;
        await audio.play();
      }
      setPlaying((p) => !p);
    } catch {}
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Silenciar música" : "Reproducir música"}
        title={playing ? "Silenciar" : "Música de fondo"}
        className="fixed bottom-24 left-5 z-[9990] w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-[#111111]/10 shadow-sm flex items-center justify-center text-[#111111]/45 hover:text-[#C9956A] hover:border-[#C9956A]/40 hover:shadow-md transition-all duration-300"
      >
        {playing ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
    </>
  );
}

function SoundOnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
