import React, { useState, useCallback, useEffect } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { DevotionalImage } from '../components/DevotionalImage';
import { CircularCounter } from '../components/CircularCounter';
import { useCounter } from '../hooks/useCounter';

// Indian language codes to filter voices
const INDIAN_LANGUAGES = ['hi-IN', 'hi'];

export function HomeScreen() {
  const { displayText, progress, increment, reset } = useCounter();
  const [spokenText, setSpokenText] = useState('Radhe');
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);

  useEffect(() => {
    Speech.getAvailableVoicesAsync().then((available) => {
      // Filter for Indian voices
      const indianVoices = available.filter((v) =>
        INDIAN_LANGUAGES.some((lang) => v.language.startsWith(lang))
      );
      // Fall back to all voices if no Indian ones found
      setVoices(indianVoices.length > 0 ? indianVoices : available);
      // Prefer Google Hindi voice, then any Hindi voice
      const googleHindi = indianVoices.find(
        (v) => v.language.startsWith('hi') && (v.identifier.toLowerCase().includes('google') || v.name?.toLowerCase().includes('google'))
      );
      if (googleHindi) {
        setSelectedVoice(googleHindi.identifier);
      } else {
        const hindiVoice = indianVoices.find((v) => v.language.startsWith('hi'));
        if (hindiVoice) {
          setSelectedVoice(hindiVoice.identifier);
        }
      }
    });
  }, []);

  const handleTap = useCallback(() => {
    increment();
    if (spokenText.trim()) {
      Speech.stop();
      Speech.speak(spokenText.trim(), {
        language: 'hi-IN',
        rate: 0.9,
        ...(selectedVoice ? { voice: selectedVoice } : {}),
      });
    }
  }, [increment, spokenText, selectedVoice]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DevotionalImage />
      <TextInput
        style={styles.textInput}
        value={spokenText}
        onChangeText={setSpokenText}
        placeholder="Enter naam (e.g. Radhe)"
        placeholderTextColor="#999"
        accessibilityLabel="Text to speak on each tap"
      />
      {voices.length > 0 && (
        <View style={styles.voiceRow}>
          <Text style={styles.voiceLabel}>Voice: </Text>
          <Pressable
            onPress={() => {
              // Cycle through available voices
              const currentIndex = voices.findIndex((v) => v.identifier === selectedVoice);
              const nextIndex = (currentIndex + 1) % voices.length;
              setSelectedVoice(voices[nextIndex].identifier);
            }}
            style={styles.voiceButton}
            accessibilityRole="button"
            accessibilityLabel="Change voice"
          >
            <Text style={styles.voiceButtonText} numberOfLines={1}>
              {voices.find((v) => v.identifier === selectedVoice)?.name ||
                voices.find((v) => v.identifier === selectedVoice)?.identifier ||
                'Default'}
              {' ▼'}
            </Text>
          </Pressable>
        </View>
      )}
      <CircularCounter
        displayText={displayText}
        progress={progress}
        onTap={handleTap}
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
  textInput: {
    width: '70%',
    borderWidth: 1.5,
    borderColor: '#FF6B00',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  voiceLabel: {
    fontSize: 13,
    color: '#666',
  },
  voiceButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    maxWidth: 180,
  },
  voiceButtonText: {
    fontSize: 13,
    color: '#FF6B00',
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
