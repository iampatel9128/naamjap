import { renderHook, act } from '@testing-library/react-native';
import { useCounter } from '../src/hooks/useCounter';

describe('useCounter hook', () => {
  /**
   * Test initial state: count is 0, displayText is "0/108", progress is 0
   * Validates: Requirements 1.2, 5.1, 5.2
   */
  it('should have correct initial state', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.displayText).toBe('0/108');
    expect(result.current.progress).toBe(0);
    expect(result.current.maxCount).toBe(108);
  });

  /**
   * Test increment: count goes from 0 to 1 after one call
   * Validates: Requirements 4.1
   */
  it('should increment count from 0 to 1', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.displayText).toBe('1/108');
    expect(result.current.progress).toBe(1 / 108);
  });

  /**
   * Test reset at 108: after 108 increments, next increment resets to 0
   * Validates: Requirements 4.1, 5.1
   */
  it('should reset to 0 after reaching 108', () => {
    const { result } = renderHook(() => useCounter());

    // Increment 108 times to reach maxCount
    act(() => {
      for (let i = 0; i < 108; i++) {
        result.current.increment();
      }
    });

    expect(result.current.count).toBe(108);
    expect(result.current.displayText).toBe('108/108');

    // Next increment should reset to 0
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.displayText).toBe('0/108');
    expect(result.current.progress).toBe(0);
  });

  /**
   * Test reset function: calling reset sets count back to 0
   * Validates: Requirements 1.2
   */
  it('should reset count to 0 when reset is called', () => {
    const { result } = renderHook(() => useCounter());

    // Increment a few times
    act(() => {
      for (let i = 0; i < 50; i++) {
        result.current.increment();
      }
    });

    expect(result.current.count).toBe(50);

    // Call reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.displayText).toBe('0/108');
    expect(result.current.progress).toBe(0);
  });
});
