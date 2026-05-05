import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RepeatSelector } from '../components/RepeatSelector';
import { PlaybackControls } from '../components/PlaybackControls';
import { RepetitionIndicator } from '../components/RepetitionIndicator';
import { MantraSelector } from '../components/MantraSelector';
import { useMantraPlayer } from '../hooks/useMantraPlayer';

export function MantraPlayerScreen() {
  const {
    repeatCount,
    setRepeatCount,
    currentRepetition,
    isPlaying,
    isLoaded,
    error,
    isSessionActive,
    selectedMantra,
    setSelectedMantra,
    play,
    pause,
  } = useMantraPlayer();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Mantra</Text>
      <MantraSelector
        selectedMantra={selectedMantra}
        onSelect={setSelectedMantra}
        disabled={isSessionActive}
      />
      <RepetitionIndicator
        currentRepetition={currentRepetition}
        totalRepetitions={repeatCount}
        isSessionActive={isSessionActive}
      />
      <RepeatSelector
        selectedCount={repeatCount}
        onSelect={setRepeatCount}
        disabled={isSessionActive}
      />
      <PlaybackControls
        isPlaying={isPlaying}
        isLoaded={isLoaded}
        onPlay={play}
        onPause={pause}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
