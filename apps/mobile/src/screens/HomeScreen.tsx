import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SecOps</Text>
      <Text style={styles.subtitle}>Intelligence Transport Platform</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#e94560', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#a0a0b0', marginBottom: 48 },
  button: { backgroundColor: '#e94560', paddingHorizontal: 48, paddingVertical: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
