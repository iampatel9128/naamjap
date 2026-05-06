import { useState, useCallback } from 'react';
import { Platform, Vibration } from 'react-native';
import { getNextCount, getProgress, getDisplayText } from '../utils/counterLogic';

function vibrate(duration: number) {
  if (Platform.OS === 'web') {
    // Web Vibration API — works on mobile browsers (Android Chrome, etc.)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  } else {
    Vibration.vibrate(duration);
  }
}

export function useCounter(maxCount: number = 108) {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = getNextCount(prev, maxCount);
      if (next === 0 && prev > 0) {
        // Reached 108 — longer vibration
        vibrate(200);
      } else {
        // Normal tap — short vibration
        vibrate(30);
      }
      return next;
    });
  }, [maxCount]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const progress = getProgress(count, maxCount);
  const displayText = getDisplayText(count, maxCount);

  return { count, maxCount, progress, displayText, increment, reset };
}
