import React from 'react';
import { Image, StyleSheet } from 'react-native';

export function DevotionalImage() {
  return (
    <Image
      source={require('../../assets/radha-krishna.png')}
      style={styles.image}
      resizeMode="contain"
      accessibilityLabel="Lord Radha and Krishna"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
});
