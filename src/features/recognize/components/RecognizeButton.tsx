import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { useRecognize } from '../hooks/useRecognize'

type Props = ReturnType<typeof useRecognize>

export const RecognizeButton: React.FC<Props> = ({
  start,
  stopAndRecognize,
  recording,
  loading,
}) => {
  const handlePress = recording ? stopAndRecognize : start
  const label = recording ? 'Stop & Recognize' : 'Record Audio'

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        recording ? styles.buttonStop : styles.buttonRecord,
        pressed && styles.buttonPressed,
      ]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  buttonRecord: {
    backgroundColor: '#007AFF',
  },
  buttonStop: {
    backgroundColor: '#FF3B30',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
