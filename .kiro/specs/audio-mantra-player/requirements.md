# Requirements Document

## Introduction

The Audio Mantra Player is a new screen in the Naam Jap Counter app that allows users to play a pre-loaded audio mantra file a specified number of times. Users select a repeat count (3, 5, 11, or 21), press play, and the mantra audio loops the chosen number of times before stopping automatically. The screen provides playback controls and a visual indicator of the current repetition progress. Navigation is added between the existing Home screen and this new Audio Mantra Player screen.

## Glossary

- **Audio_Mantra_Player**: The new screen/page in the app that handles audio mantra playback with repeat functionality
- **Mantra_Audio**: A pre-loaded audio file bundled with the app containing the mantra recording
- **Repeat_Count**: The number of times the mantra audio will play in sequence (3, 5, 11, or 21)
- **Playback_Session**: A single run of the mantra audio playing the selected number of repetitions from start to finish
- **Navigation_System**: The mechanism that allows users to move between the Home screen and the Audio Mantra Player screen
- **Repetition_Indicator**: A visual display showing which repetition is currently playing out of the total selected

## Requirements

### Requirement 1: Navigation Between Screens

**User Story:** As a user, I want to navigate between the Home screen and the Audio Mantra Player screen, so that I can access both features of the app.

#### Acceptance Criteria

1. THE Navigation_System SHALL provide a navigation element on the Home screen that navigates to the Audio_Mantra_Player screen
2. THE Navigation_System SHALL provide a navigation element on the Audio_Mantra_Player screen that navigates back to the Home screen
3. THE Navigation_System SHALL function on iOS, Android, and Web platforms

### Requirement 2: Repeat Count Selection

**User Story:** As a user, I want to select how many times the mantra plays, so that I can chant along for my desired number of repetitions.

#### Acceptance Criteria

1. THE Audio_Mantra_Player SHALL display selectable repeat count options of 3, 5, 11, and 21
2. THE Audio_Mantra_Player SHALL visually indicate the currently selected Repeat_Count
3. THE Audio_Mantra_Player SHALL default to a Repeat_Count of 3 when the screen first loads
4. WHEN a user selects a Repeat_Count, THE Audio_Mantra_Player SHALL update the selection immediately

### Requirement 3: Audio Playback Controls

**User Story:** As a user, I want play and pause controls for the mantra audio, so that I can start and pause the chanting at my convenience.

#### Acceptance Criteria

1. THE Audio_Mantra_Player SHALL display a play button when audio is not playing
2. THE Audio_Mantra_Player SHALL display a pause button when audio is currently playing
3. WHEN the user presses the play button, THE Audio_Mantra_Player SHALL begin playing the Mantra_Audio from the current position
4. WHEN the user presses the pause button, THE Audio_Mantra_Player SHALL pause the Mantra_Audio at the current position
5. WHEN the user presses the play button after pausing, THE Audio_Mantra_Player SHALL resume playback from the paused position

### Requirement 4: Repeat Playback Logic

**User Story:** As a user, I want the mantra to automatically repeat the selected number of times, so that I can chant along without manually restarting the audio.

#### Acceptance Criteria

1. WHEN playback starts, THE Audio_Mantra_Player SHALL play the Mantra_Audio the number of times specified by the selected Repeat_Count
2. WHEN one repetition of the Mantra_Audio completes and the total Repeat_Count has not been reached, THE Audio_Mantra_Player SHALL automatically begin the next repetition
3. WHEN the final repetition completes, THE Audio_Mantra_Player SHALL stop playback and reset to the initial ready state
4. WHILE a Playback_Session is active, THE Audio_Mantra_Player SHALL disable Repeat_Count selection

### Requirement 5: Repetition Progress Display

**User Story:** As a user, I want to see which repetition is currently playing, so that I can track my chanting progress.

#### Acceptance Criteria

1. WHILE a Playback_Session is active, THE Repetition_Indicator SHALL display the current repetition number and the total Repeat_Count in the format "Playing N/Total"
2. WHEN playback has not started, THE Repetition_Indicator SHALL display the total selected Repeat_Count
3. WHEN the Playback_Session completes, THE Repetition_Indicator SHALL reset to show the selected Repeat_Count without a current repetition number

### Requirement 6: Audio File Loading

**User Story:** As a user, I want the mantra audio to load reliably, so that I can begin chanting without issues.

#### Acceptance Criteria

1. THE Audio_Mantra_Player SHALL load the Mantra_Audio file when the screen mounts
2. IF the Mantra_Audio file fails to load, THEN THE Audio_Mantra_Player SHALL display an error message to the user
3. IF the Mantra_Audio file fails to load, THEN THE Audio_Mantra_Player SHALL disable the play button
4. THE Audio_Mantra_Player SHALL unload the Mantra_Audio file when the user navigates away from the screen

### Requirement 7: Cross-Platform Audio Support

**User Story:** As a user, I want the audio mantra to work on any device, so that I can chant regardless of which platform I use.

#### Acceptance Criteria

1. THE Audio_Mantra_Player SHALL play the Mantra_Audio on iOS devices
2. THE Audio_Mantra_Player SHALL play the Mantra_Audio on Android devices
3. THE Audio_Mantra_Player SHALL play the Mantra_Audio on Web browsers
