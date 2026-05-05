import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DevotionalImage } from '../components/DevotionalImage';
import { CircularCounter } from '../components/CircularCounter';
import { useCounter } from '../hooks/useCounter';

export function HomeScreen() {
  const { displayText, progress, increment } = useCounter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DevotionalImage />
      <CircularCounter
        displayText={displayText}
        progress={progress}
        onTap={increment}
      />
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
});
