import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Empty({ message }: { message?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message || 'Hələ məlumat yoxdur'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 15,
    opacity: 0.6,
  },
});
