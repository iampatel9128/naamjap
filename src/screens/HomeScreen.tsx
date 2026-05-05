import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DevotionalImage } from '../components/DevotionalImage';
import { CircularCounter } from '../components/CircularCounter';
import { useCounter } from '../hooks/useCounter';

export function HomeScreen() {
  const { displayText, progress, increment, reset } = useCounter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DevotionalImage />
      <CircularCounter
        displayText={displayText}
        progress={progress}
        onTap={increment}
      />
      <Pressable
        onPress={reset}
        style={styles.resetButton}
        accessibilityRole="button"
        accessibilityLabel="Reset counter"
      >
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
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
  resetButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#FF6B00',
    borderRadius: 24,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
