import { useState, useCallback, useEffect, useRef } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import {
  RepeatCount,
  getNextRepetition,
} from '../utils/repeatLogic';
import { MantraEntry, getDefaultMantra } from '../utils/mantraCatalog';

interface UseMantraPlayerReturn {
  repeatCount: RepeatCount;
  setRepeatCount: (count: RepeatCount) => void;
  currentRepetition: number;
  isPlaying: boolean;
  isLoaded: boolean;
  error: string | null;
  isSessionActive: boolean;
  selectedMantra: MantraEntry;
  setSelectedMantra: (mantra: MantraEntry) => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
}

export function useMantraPlayer(): UseMantraPlayerReturn {
  const [repeatCount, setRepeatCountState] = useState<RepeatCount>(3);
  const [currentRepetition, setCurrentRepetition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMantra, setSelectedMantraState] = useState<MantraEntry>(getDefaultMantra());
  const soundRef = useRef<Audio.Sound | null>(null);

  const isSessionActive = currentRepetition > 0;

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        setCurrentRepetition((prev) => {
          const next = getNextRepetition(prev, repeatCount);
          if (next === 0) {
            // Session complete — reset state
            setIsPlaying(false);
            return 0;
          }
          // More repetitions remain — pause 1 second, then replay from start
          setTimeout(() => {
            soundRef.current?.setPositionAsync(0).then(() => {
              soundRef.current?.playAsync();
            });
          }, 1000);
          return next;
        });
      }
    },
    [repeatCount]
  );

  // Load audio when selectedMantra changes
  useEffect(() => {
    let isMounted = true;

    async function loadAudio() {
      // Unload previous sound if any
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      setIsLoaded(false);
      setError(null);

      try {
        const { sound } = await Audio.Sound.createAsync(selectedMantra.source);
        if (!isMounted) {
          await sound.unloadAsync();
          return;
        }
        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setIsLoaded(true);
      } catch (e) {
        if (isMounted) {
          setError('Failed to load audio. Please try again.');
          setIsLoaded(false);
        }
      }
    }

    loadAudio();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [selectedMantra]);

  // Keep the playback status callback in sync with repeatCount
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [onPlaybackStatusUpdate]);

  const play = useCallback(async () => {
    if (!soundRef.current || !isLoaded) return;

    if (!isSessionActive) {
      setCurrentRepetition(1);
    }
    setIsPlaying(true);
    await soundRef.current.playAsync();
  }, [isLoaded, isSessionActive]);

  const pause = useCallback(async () => {
    if (!soundRef.current) return;

    setIsPlaying(false);
    await soundRef.current.pauseAsync();
  }, []);

  const handleSetRepeatCount = useCallback(
    (count: RepeatCount) => {
      if (isSessionActive) return;
      setRepeatCountState(count);
    },
    [isSessionActive]
  );

  const handleSetSelectedMantra = useCallback(
    (mantra: MantraEntry) => {
      // Prevent changing mantra during active session
      if (isSessionActive) return;
      setSelectedMantraState(mantra);
    },
    [isSessionActive]
  );

  return {
    repeatCount,
    setRepeatCount: handleSetRepeatCount,
    currentRepetition,
    isPlaying,
    isLoaded,
    error,
    isSessionActive,
    selectedMantra,
    setSelectedMantra: handleSetSelectedMantra,
    play,
    pause,
  };
}
