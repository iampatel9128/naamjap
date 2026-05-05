/**
 * Pure repeat logic functions for the Audio Mantra Player.
 * Extracted for testability and property-based testing.
 */

/**
 * Valid repeat count options for mantra playback.
 */
export type RepeatCount = 3 | 5 | 11 | 21;

/**
 * Array of all valid repeat count values.
 */
export const VALID_REPEAT_COUNTS: RepeatCount[] = [3, 5, 11, 21];

/**
 * Returns the next repetition number after one audio play completes.
 * Returns currentRepetition + 1 if below repeatCount, else 0 (session complete).
 */
export function getNextRepetition(currentRepetition: number, repeatCount: RepeatCount): number {
  if (currentRepetition >= repeatCount) return 0;
  return currentRepetition + 1;
}

/**
 * Returns true if the session is complete (all repetitions played).
 */
export function isSessionComplete(currentRepetition: number, repeatCount: RepeatCount): boolean {
  return currentRepetition >= repeatCount;
}

/**
 * Returns the display text for the repetition indicator.
 * Shows "Playing N/Total" when active, "×Total" when inactive.
 */
export function getRepetitionDisplayText(
  currentRepetition: number,
  repeatCount: RepeatCount,
  isSessionActive: boolean
): string {
  if (isSessionActive) return `Playing ${currentRepetition}/${repeatCount}`;
  return `×${repeatCount}`;
}

/**
 * Returns whether repeat count selection should be disabled.
 * Selection is disabled during an active session.
 */
export function isRepeatSelectionDisabled(isSessionActive: boolean): boolean {
  return isSessionActive;
}

/**
 * Validates that a number is a valid repeat count.
 * Type guard for runtime validation of dynamic values.
 */
export function isValidRepeatCount(value: number): value is RepeatCount {
  return VALID_REPEAT_COUNTS.includes(value as RepeatCount);
}
