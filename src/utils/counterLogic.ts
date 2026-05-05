/**
 * Pure counter logic functions for the Naam Jap Counter.
 * Extracted for testability and property-based testing.
 */

/**
 * Returns the next count value after an increment.
 * Resets to 0 when currentCount reaches maxCount.
 */
export function getNextCount(currentCount: number, maxCount: number = 108): number {
  return currentCount >= maxCount ? 0 : currentCount + 1;
}

/**
 * Returns the progress as a ratio of currentCount to maxCount.
 * Result is in the range [0.0, 1.0].
 */
export function getProgress(currentCount: number, maxCount: number = 108): number {
  return currentCount / maxCount;
}

/**
 * Returns the formatted display text showing current count and max count.
 */
export function getDisplayText(currentCount: number, maxCount: number = 108): string {
  return `${currentCount}/${maxCount}`;
}
