import * as fc from 'fast-check';
import { getDisplayText, getNextCount, getProgress } from '../src/utils/counterLogic';

describe('Counter Logic - Property-Based Tests', () => {
  /**
   * Property 1: Counter display format
   * For any count in [0, 108], getDisplayText(count) equals "${count}/108"
   *
   * **Validates: Requirements 3.2, 3.3, 5.2**
   */
  it('Property 1: display text format is always "${count}/108"', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 108 }), (count) => {
        expect(getDisplayText(count)).toBe(`${count}/108`);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Increment produces correct next value
   * For any count in [0, 108], getNextCount(count) returns count + 1 when count < 108,
   * and 0 when count === 108
   *
   * **Validates: Requirements 4.1, 4.3, 5.1**
   */
  it('Property 2: increment produces correct next value', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 108 }), (count) => {
        const next = getNextCount(count);
        if (count < 108) {
          expect(next).toBe(count + 1);
        } else {
          expect(next).toBe(0);
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Count range invariant
   * For any number of taps (1–500), applying getNextCount repeatedly from 0
   * always keeps count in [0, 108]
   *
   * **Validates: Requirements 5.3**
   */
  it('Property 3: count always stays within [0, 108] after any number of taps', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 500 }), (numTaps) => {
        let count = 0;
        for (let i = 0; i < numTaps; i++) {
          count = getNextCount(count);
          expect(count).toBeGreaterThanOrEqual(0);
          expect(count).toBeLessThanOrEqual(108);
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Progress calculation proportionality
   * For any count in [0, 108], getProgress(count) equals count / 108
   *
   * **Validates: Requirements 6.1, 6.2, 6.3**
   */
  it('Property 4: progress equals count / 108', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 108 }), (count) => {
        expect(getProgress(count)).toBe(count / 108);
      }),
      { numRuns: 100 }
    );
  });
});
