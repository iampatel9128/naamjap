import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RepeatCount, getRepetitionDisplayText } from '../utils/repeatLogic';

interface RepetitionIndicatorProps {
  currentRepetition: number;
  totalRepetitions: RepeatCount;
  isSessionActive: boolean;
}

export function RepetitionIndicator({
  currentRepetition,
  totalRepetitions,
  isSessionActive,
}: RepetitionIndicatorProps) {
  const displayText = getRepetitionDisplayText(
    currentRepetition,
    totalRepetitions,
    isSessionActive
  );

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        accessibilityRole="text"
        accessibilityLabel={
          isSessionActive
            ? `Playing repetition ${currentRepetition} of ${totalRepetitions}`
            : `${totalRepetitions} repetitions selected`
        }
      >
        {displayText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
});
