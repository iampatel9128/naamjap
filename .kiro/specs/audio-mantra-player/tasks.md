# Implementation Plan: Audio Mantra Player

## Overview

Add a second screen to the Naam Jap Counter app for playing a pre-loaded mantra audio file a configurable number of times (3, 5, 11, or 21 repetitions). Introduces bottom tab navigation between the existing Home screen and the new Audio Mantra Player screen. Uses `expo-av` for cross-platform audio playback and follows the existing custom hook + pure logic pattern.

## Tasks

- [ ] 1. Install dependencies and add audio asset placeholder
  - [x] 1.1 Install navigation and audio dependencies
    - Run `npx expo install expo-av @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context`
    - Verify packages are added to `package.json`
    - _Requirements: 1.1, 1.3, 7.1, 7.2, 7.3_

  - [x] 1.2 Add placeholder mantra audio file
    - Create `assets/mantra.mp3` as a placeholder file (user will provide the real audio later)
    - Add a comment in the code noting the placeholder needs to be replaced
    - _Requirements: 6.1_

- [ ] 2. Implement pure repeat logic functions
  - [x] 2.1 Create `src/utils/repeatLogic.ts`
    - Define and export `RepeatCount` type as `3 | 5 | 11 | 21`
    - Export `VALID_REPEAT_COUNTS` array `[3, 5, 11, 21]`
    - Implement `getNextRepetition(currentRepetition, repeatCount)`: returns `currentRepetition + 1` if below repeatCount, else `0`
    - Implement `isSessionComplete(currentRepetition, repeatCount)`: returns `true` when `currentRepetition >= repeatCount`
    - Implement `getRepetitionDisplayText(currentRepetition, repeatCount, isSessionActive)`: returns `"Playing N/Total"` when active, `"×Total"` when inactive
    - Implement `isRepeatSelectionDisabled(isSessionActive)`: returns `isSessionActive`
    - Implement `isValidRepeatCount(value)`: type guard returning whether value is a valid RepeatCount
    - _Requirements: 2.4, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3_

  - [ ]* 2.2 Write property test: Repeat count selection updates state
    - **Property 1: Repeat count selection updates state**
    - Generate random valid repeat counts using `fc.constantFrom(3, 5, 11, 21)`
    - Assert that `isValidRepeatCount` returns true for all valid counts
    - **Validates: Requirements 2.4**

  - [ ]* 2.3 Write property test: Next repetition increments during active session
    - **Property 2: Next repetition increments during active session**
    - Generate random valid repeat count and random currentRepetition in [0, repeatCount-1]
    - Assert `getNextRepetition(currentRepetition, repeatCount) === currentRepetition + 1`
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 2.4 Write property test: Session completes at repeat count
    - **Property 3: Session completes at repeat count**
    - Generate random valid repeat count
    - Assert `isSessionComplete(repeatCount, repeatCount) === true`
    - Generate random n in [0, repeatCount-1], assert `isSessionComplete(n, repeatCount) === false`
    - **Validates: Requirements 4.3**

  - [ ]* 2.5 Write property test: Selection disabled during active session
    - **Property 4: Selection disabled during active session**
    - Generate random currentRepetition in [1, 21]
    - Assert `isRepeatSelectionDisabled(true) === true`
    - Assert `isRepeatSelectionDisabled(false) === false`
    - **Validates: Requirements 4.4**

  - [ ]* 2.6 Write property test: Display format during active session
    - **Property 5: Display format during active session**
    - Generate random valid repeat count and random currentRepetition in [1, repeatCount]
    - Assert `getRepetitionDisplayText(currentRepetition, repeatCount, true) === `Playing ${currentRepetition}/${repeatCount}``
    - **Validates: Requirements 5.1**

  - [ ]* 2.7 Write property test: Display format when session is inactive
    - **Property 6: Display format when session is inactive**
    - Generate random valid repeat count
    - Assert `getRepetitionDisplayText(0, repeatCount, false) === `×${repeatCount}``
    - **Validates: Requirements 5.2, 5.3**

- [x] 3. Checkpoint - Verify pure logic and property tests
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement useMantraPlayer custom hook
  - [x] 4.1 Create `src/hooks/useMantraPlayer.ts`
    - Import `Audio` from `expo-av` and pure functions from `repeatLogic.ts`
    - Manage state: `repeatCount` (default 3), `currentRepetition` (0), `isPlaying`, `isLoaded`, `error`
    - Derive `isSessionActive` from `currentRepetition > 0`
    - Load audio on mount using `Audio.Sound.createAsync(require('../../assets/mantra.mp3'))`
    - Handle `onPlaybackStatusUpdate` to detect when audio finishes playing
    - On audio finish: use `getNextRepetition` to determine next state; if not complete, replay from start; if complete, reset state
    - Implement `play()`: starts playback, sets `currentRepetition` to 1 if not in session
    - Implement `pause()`: pauses audio playback
    - Guard `setRepeatCount` to prevent changes during active session
    - Unload audio on unmount via cleanup effect
    - _Requirements: 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3, 6.4_

- [ ] 5. Implement UI components
  - [x] 5.1 Create `src/components/RepeatSelector.tsx`
    - Accept props: `selectedCount`, `onSelect`, `disabled`
    - Render 4 `Pressable` buttons for counts 3, 5, 11, 21
    - Highlight selected count with orange accent (`#FF6B00`)
    - Disable all buttons when `disabled=true` (during active session)
    - Add accessibility labels for each button
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.4_

  - [x] 5.2 Create `src/components/PlaybackControls.tsx`
    - Accept props: `isPlaying`, `isLoaded`, `onPlay`, `onPause`
    - Render a single large play/pause button
    - Show play icon (▶) when `!isPlaying`, pause icon (⏸) when `isPlaying`
    - Disable button when `!isLoaded`
    - Add accessibility role and label
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.3_

  - [x] 5.3 Create `src/components/RepetitionIndicator.tsx`
    - Accept props: `currentRepetition`, `totalRepetitions`, `isSessionActive`
    - When `isSessionActive`: display `"Playing N/Total"`
    - When `!isSessionActive`: display `"×Total"` (e.g., "×11")
    - Style with large, readable text
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 5.4 Write component tests for RepeatSelector
    - Test all four options (3, 5, 11, 21) are rendered
    - Test selected option is visually highlighted
    - Test `onSelect` is called when an option is pressed
    - Test buttons are disabled when `disabled=true`
    - _Requirements: 2.1, 2.2, 2.4, 4.4_

  - [ ]* 5.5 Write component tests for PlaybackControls
    - Test play button renders when `isPlaying=false`
    - Test pause button renders when `isPlaying=true`
    - Test button is disabled when `isLoaded=false`
    - Test `onPlay` and `onPause` callbacks are triggered
    - _Requirements: 3.1, 3.2, 6.3_

  - [ ]* 5.6 Write component tests for RepetitionIndicator
    - Test displays "Playing N/Total" during active session
    - Test displays "×Total" when session is not active
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 6. Create MantraPlayerScreen and wire components
  - [x] 6.1 Create `src/screens/MantraPlayerScreen.tsx`
    - Use `useMantraPlayer` hook for all state and actions
    - Render title "Audio Mantra"
    - Render `RepetitionIndicator`, `RepeatSelector`, `PlaybackControls`
    - Display error message when `error` is not null
    - Style with centered layout matching app theme (`#FFF8F0` background)
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 5.1, 5.2, 6.2_

- [ ] 7. Update App.tsx with tab navigation
  - [x] 7.1 Update `App.tsx` to use React Navigation Bottom Tabs
    - Import `NavigationContainer` from `@react-navigation/native`
    - Import `createBottomTabNavigator` from `@react-navigation/bottom-tabs`
    - Create `Tab.Navigator` with two screens: "Home" (HomeScreen) and "Mantra" (MantraPlayerScreen)
    - Configure tab bar styling: active tint `#FF6B00`, inactive tint `#999`, `headerShown: false`
    - Remove direct `<HomeScreen />` render
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 8. Checkpoint - Verify navigation and UI
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 9. Write integration tests for useMantraPlayer hook
  - [ ]* 9.1 Write integration tests with mocked expo-av
    - Mock `Audio.Sound.createAsync` to return a mock sound object
    - Test audio loads on mount (verify `createAsync` called)
    - Test audio unloads on unmount (verify `unloadAsync` called)
    - Test play calls `playAsync()` on the sound object
    - Test pause calls `pauseAsync()` on the sound object
    - Test playback completion triggers next repetition via `onPlaybackStatusUpdate`
    - Test final repetition completion resets state to initial
    - Test error state is set when audio fails to load
    - _Requirements: 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 6.1, 6.2, 6.3, 6.4_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use `fast-check` (already in devDependencies) and validate the 6 correctness properties from the design
- The `assets/mantra.mp3` is a placeholder — the user will provide the actual mantra audio file
- All code is TypeScript targeting React Native + Expo
- The existing HomeScreen and its components remain unchanged
- Checkpoints ensure incremental validation
