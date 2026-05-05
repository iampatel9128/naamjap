import { useState, useCallback } from 'react';
import { getNextCount, getProgress, getDisplayText } from '../utils/counterLogic';

export function useCounter(maxCount: number = 108) {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => getNextCount(prev, maxCount));
  }, [maxCount]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const progress = getProgress(count, maxCount);
  const displayText = getDisplayText(count, maxCount);

  return { count, maxCount, progress, displayText, increment, reset };
}
