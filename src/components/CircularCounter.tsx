import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularCounterProps {
  displayText: string;
  progress: number;
  onTap: () => void;
}

export function CircularCounter({ displayText, progress, onTap }: CircularCounterProps) {
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Pressable
      onPress={onTap}
      accessibilityRole="button"
      accessibilityLabel={`Counter: ${displayText}. Tap to increment.`}
    >
      <View style={styles.container}>
        <Svg width={size} height={size}>
          {/* Background track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FF6B00"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <Text style={styles.counterText}>{displayText}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});
