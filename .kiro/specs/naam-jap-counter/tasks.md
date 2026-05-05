# Implementation Plan: Naam Jap Counter (React Native + Expo)

## Overview

Cross-platform chanting counter built with React Native, Expo, and TypeScript. The app displays a Radha-Krishna devotional image above a circular tap counter that tracks repetitions up to 108 (one mala) with automatic reset. Runs on iOS, Android, and Web from a single codebase.

## Tasks

- [x] 1. Set up Expo project and install dependencies
  - [x] 1.1 Initialize Expo project with TypeScript template
    - Create the project using `npx create-expo-app` with TypeScript template
    - Configure `app.json` with app name "Naam Jap Counter" and web support
    - _Requirements: 1.1_

  - [x] 1.2 Install runtime dependencies
    - Install `react-native-svg` for circular progress rendering
    - Install `expo-status-bar` (included by default)
    - _Requirements: 6.1_

  - [x] 1.3 Install dev dependencies and configure testing
    - Install `jest-expo`, `@testing-library/react-native`, `@testing-library/jest-native`, `fast-check`, `@types/jest`
    - Configure Jest in `package.json` with `jest-expo` preset
    - Verify test runner works with a placeholder test
    - _Requirements: N/A (testing infrastructure)_

  - [x] 1.4 Create project directory structure
    - Create `src/screens/`, `src/components/`, `src/hooks/`, `src/utils/`, `assets/`, and `__tests__/` directories
    - Add a placeholder `assets/radha-krishna.png` image file
    - _Requirements: 2.1_

- [x] 2. Implement pure counter logic functions
  - [x] 2.1 Create `src/utils/counterLogic.ts` with pure functions
    - Implement `getNextCount(currentCount, maxCount)`: returns `currentCount + 1` if below max, else `0`
    - Implement `getProgress(currentCount, maxCount)`: returns `currentCount / maxCount`
    - Implement `getDisplayText(currentCount, maxCount)`: returns formatted string `"${count}/${maxCount}"`
    - Export all functions with proper TypeScript types
    - _Requirements: 4.1, 4.3, 5.1, 5.3, 6.1, 3.2_

  - [x]* 2.2 Write property test: Counter display format
    - **Property 1: Counter display format**
    - For any count in [0, 108], `getDisplayText(count)` equals `"${count}/108"`
    - Use `fc.integer({ min: 0, max: 108 })` to generate inputs
    - **Validates: Requirements 3.2, 3.3, 5.2**

  - [x]* 2.3 Write property test: Increment produces correct next value
    - **Property 2: Increment produces correct next value**
    - For any count in [0, 108], `getNextCount(count)` returns `count + 1` when `count < 108`, and `0` when `count === 108`
    - **Validates: Requirements 4.1, 4.3, 5.1**

  - [x]* 2.4 Write property test: Count range invariant
    - **Property 3: Count range invariant**
    - For any number of taps (1–500), applying `getNextCount` repeatedly from 0 always keeps count in [0, 108]
    - Use `fc.integer({ min: 1, max: 500 })` for tap count generation
    - **Validates: Requirements 5.3**

  - [x]* 2.5 Write property test: Progress calculation proportionality
    - **Property 4: Progress calculation proportionality**
    - For any count in [0, 108], `getProgress(count)` equals `count / 108`
    - **Validates: Requirements 6.1, 6.2, 6.3**

- [x] 3. Implement useCounter custom hook
  - [x] 3.1 Create `src/hooks/useCounter.ts`
    - Implement `useCounter(maxCount = 108)` hook using `useState` and `useCallback`
    - Expose `count`, `maxCount`, `progress`, `displayText`, `increment`, and `reset`
    - Use `getNextCount` from counterLogic for increment logic
    - Use `getProgress` and `getDisplayText` for derived values
    - _Requirements: 1.2, 4.1, 4.3, 5.1, 5.3_

  - [x]* 3.2 Write unit tests for useCounter hook
    - Test initial state: count is 0, displayText is "0/108", progress is 0
    - Test increment: count goes from 0 to 1 after one call
    - Test reset at 108: after 108 increments, next increment resets to 0
    - Test reset function: calling reset sets count back to 0
    - _Requirements: 1.2, 4.1, 5.1, 5.2_

- [x] 4. Checkpoint - Verify core logic
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement UI components
  - [x] 5.1 Create `src/components/DevotionalImage.tsx`
    - Render the Radha-Krishna image using `Image` component from React Native
    - Use `resizeMode="contain"` for proper scaling
    - Add `accessibilityLabel="Lord Radha and Krishna"`
    - Style with appropriate sizing and margin
    - _Requirements: 2.1, 2.2_

  - [x] 5.2 Create `src/components/CircularCounter.tsx`
    - Accept props: `displayText`, `progress`, `onTap`
    - Render SVG circle background track and progress arc using `react-native-svg`
    - Calculate `strokeDashoffset` from progress value for arc fill
    - Display `displayText` centered over the SVG
    - Wrap in `Pressable` with `onPress={onTap}`
    - Add accessibility: `accessibilityRole="button"`, descriptive `accessibilityLabel`
    - _Requirements: 3.1, 3.2, 3.3, 4.1, 6.1, 6.2, 6.3_

  - [x]* 5.3 Write component tests for CircularCounter
    - Test that displayText is rendered correctly
    - Test that pressing the component triggers onTap callback
    - Test accessibility label is present
    - _Requirements: 3.1, 3.2, 4.1_

  - [x]* 5.4 Write component tests for DevotionalImage
    - Test that the image renders with correct accessibility label
    - _Requirements: 2.1_

- [x] 6. Implement HomeScreen and wire everything together
  - [x] 6.1 Create `src/screens/HomeScreen.tsx`
    - Use `useCounter` hook for state management
    - Render `DevotionalImage` above `CircularCounter`
    - Pass `displayText`, `progress`, and `increment` to CircularCounter
    - Style with centered flexbox layout and appropriate background color
    - _Requirements: 1.1, 2.2, 3.1, 4.1_

  - [x] 6.2 Update `App.tsx` entry point
    - Import and render `HomeScreen` directly (no navigation)
    - No authentication gate — immediate display
    - _Requirements: 1.1, 1.2_

  - [x]* 6.3 Write integration test for HomeScreen
    - Test that HomeScreen renders both DevotionalImage and CircularCounter
    - Test that tapping the counter updates the displayed count
    - Test initial display shows "0/108"
    - _Requirements: 1.1, 1.2, 3.3, 4.1, 4.2_

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use `fast-check` and validate the 4 correctness properties from the design
- Unit/component tests use Jest + React Native Testing Library
- All code is TypeScript targeting React Native + Expo
- Checkpoints ensure incremental validation
