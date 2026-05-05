import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isLoaded: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export function PlaybackControls({ isPlaying, isLoaded, onPlay, onPause }: PlaybackControlsProps) {
  const disabled = !isLoaded;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={isPlaying ? onPause : onPlay}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause mantra' : 'Play mantra'}
        accessibilityState={{ disabled }}
        style={[
          styles.button,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[styles.icon, disabled && styles.iconDisabled]}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
    color: '#FFF',
  },
  iconDisabled: {
    color: '#CCC',
  },
});
