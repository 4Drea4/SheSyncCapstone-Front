import React, { createContext, useEffect, useMemo, useRef, useState } from "react";

type MusicContextType = {
  isOn: boolean;
  toggle: () => void;
  stop: () => void;
};

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOn, setIsOn] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("musicOn");
    if (saved === "true") setIsOn(true);
  }, []);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio(new URL("../assets/music.mp3", import.meta.url).toString());
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Play/pause when isOn changes
  useEffect(() => {
    localStorage.setItem("musicOn", String(isOn));

    const audio = audioRef.current;
    if (!audio) return;

    if (isOn) {
      // Autoplay restrictions: play() may reject until user interacts
      audio.play().catch(() => {
        // Don’t spam errors. Just flip it off if browser blocks it.
        setIsOn(false);
        localStorage.setItem("musicOn", "false");
      });
    } else {
      audio.pause();
    }
  }, [isOn]);

  const value = useMemo(
    () => ({
      isOn,
      toggle: () => setIsOn((prev) => !prev),
      stop: () => setIsOn(false),
    }),
    [isOn]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}
