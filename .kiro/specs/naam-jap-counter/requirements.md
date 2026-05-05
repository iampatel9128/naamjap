# Requirements Document

## Introduction

Naam Jap Counter is an Android application designed as a learning project for Android development. The app provides a simple, focused experience for users to count their "Naam Jap" (chanting repetitions) with a devotional theme featuring Lord Radha and Krishna. The MVP includes a home screen with a devotional image, a circular tap counter that tracks counts up to 108 (one mala), and automatic reset functionality.

## Glossary

- **App**: The Naam Jap Counter Android application
- **Home_Screen**: The main and only screen of the application displayed on launch
- **Circular_Counter**: A circular UI component on the Home_Screen that displays the current count and responds to tap interactions
- **Current_Count**: The number of taps registered in the current cycle, ranging from 0 to 108
- **Mala**: One complete cycle of 108 chanting repetitions
- **Devotional_Image**: An image of Lord Radha and Krishna displayed on the Home_Screen
- **Counter_Display**: The text shown in the center of the Circular_Counter in the format current_count/108

## Requirements

### Requirement 1: Application Launch

**User Story:** As a user, I want the app to open directly to the home screen without any login or signup, so that I can start counting immediately.

#### Acceptance Criteria

1. WHEN the App is launched, THE Home_Screen SHALL be displayed without requiring any authentication or account creation
2. WHEN the App is launched, THE Circular_Counter SHALL display an initial Current_Count of 0

### Requirement 2: Devotional Image Display

**User Story:** As a user, I want to see an image of Lord Radha and Krishna on the home screen, so that I feel a devotional connection while chanting.

#### Acceptance Criteria

1. THE Home_Screen SHALL display the Devotional_Image of Lord Radha and Krishna
2. THE Devotional_Image SHALL be visible above the Circular_Counter on the Home_Screen

### Requirement 3: Circular Counter Display

**User Story:** As a user, I want to see a circular counter on the home screen, so that I can visually track my chanting progress.

#### Acceptance Criteria

1. THE Home_Screen SHALL display the Circular_Counter as a circular UI element
2. THE Circular_Counter SHALL display the Counter_Display in its center in the format "current_count/108"
3. WHEN the Current_Count is 0, THE Counter_Display SHALL show "0/108"

### Requirement 4: Counter Increment on Tap

**User Story:** As a user, I want the counter to increase by 1 each time I tap it, so that I can track each chanting repetition.

#### Acceptance Criteria

1. WHEN the user taps the Circular_Counter, THE App SHALL increment the Current_Count by 1
2. WHEN the Current_Count is incremented, THE Counter_Display SHALL update to reflect the new Current_Count value
3. THE App SHALL register each distinct tap as exactly one increment

### Requirement 5: Counter Reset at 108

**User Story:** As a user, I want the counter to automatically reset to 0 after reaching 108, so that I can start a new mala cycle seamlessly.

#### Acceptance Criteria

1. WHEN the Current_Count reaches 108, THE App SHALL reset the Current_Count to 0
2. WHEN the Current_Count is reset, THE Counter_Display SHALL update to show "0/108"
3. THE Current_Count SHALL remain within the range of 0 to 108 inclusive

### Requirement 6: Counter Visual Progress

**User Story:** As a user, I want the circular counter to visually indicate my progress, so that I can see at a glance how far along I am in the current mala.

#### Acceptance Criteria

1. THE Circular_Counter SHALL visually represent the progress of Current_Count relative to 108 along its circular path
2. WHEN the Current_Count is incremented, THE Circular_Counter SHALL update its visual progress indicator proportionally
3. WHEN the Current_Count is reset to 0, THE Circular_Counter SHALL reset its visual progress indicator to the starting position
