import { useCallback, useEffect, useRef } from "react";
import { useNavigation } from "react-router";

import { useBoolean } from "./use-boolean";
import { PREVIEW_EVENTS } from "@app/lib/events";

export function useTrackPreview(url?: string | null) {
  const audio = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useBoolean(false);
  const navigation = useNavigation();

  const handleInterrupt = useCallback(
    (event: CustomEvent<Record<string, string>>) => {
      console.log(event.detail, url, event.detail.url === url);
      if (event.detail.url === url) return;
      setIsPlaying.false();
    },
    [],
  );

  useEffect(() => {
    if (url) audio.current = new Audio(url);
    if (!audio.current) return;
    audio.current.addEventListener("ended", setIsPlaying.false);
    document.addEventListener(PREVIEW_EVENTS.PLAY, handleInterrupt);
    return () => {
      if (!audio.current) return;
      audio.current.removeEventListener("ended", setIsPlaying.false);
      document.removeEventListener(PREVIEW_EVENTS.PLAY, handleInterrupt);
    };
  }, []);

  useEffect(() => {
    if (!audio.current) return;
    if (isPlaying) {
      audio.current.play();
      document.dispatchEvent(
        new CustomEvent(PREVIEW_EVENTS.PLAY, {
          detail: {
            url,
          },
        }),
      );
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
      document.dispatchEvent(
        new CustomEvent(PREVIEW_EVENTS.PAUSE, {
          detail: {
            url,
          },
        }),
      );
    }
  }, [isPlaying]);

  useEffect(() => {
    if (navigation.state !== "idle") setIsPlaying.false();
  }, [navigation.state]);

  return [isPlaying, setIsPlaying, audio] as const;
}
