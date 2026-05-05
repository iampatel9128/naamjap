import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { RepeatCount, VALID_REPEAT_COUNTS } from '../utils/repeatLogic';

interface RepeatSelectorProps {
  selectedCount: RepeatCount;
  onSelect: (count: RepeatCount) => void;
  disabled: boolean;
}

export function RepeatSelector({ selectedCount, onSelect, disabled }: RepeatSelectorProps) {
  return (
    <View style={styles.container}>
      {VALID_REPEAT_COUNTS.map((count) => {
        const isSelected = count === selectedCount;
        return (
          <Pressable
            key={count}
            onPress={() => onSelect(count)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`Repeat ${count} times${isSelected ? ', selected' : ''}`}
            accessibilityState={{ selected: isSelected, disabled }}
            style={[
              styles.button,
              isSelected && styles.buttonSelected,
              disabled && styles.buttonDisabled,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isSelected && styles.buttonTextSelected,
                disabled && styles.buttonTextDisabled,
              ]}
            >
              {count}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  buttonSelected: {
    borderColor: '#FF6B00',
    backgroundColor: '#FF6B00',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonTextSelected: {
    color: '#FFF',
  },
  buttonTextDisabled: {
    color: '#999',
  },
});
