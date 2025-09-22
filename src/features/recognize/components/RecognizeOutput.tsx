import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useRecognize } from '../hooks/useRecognize'

type Props = Pick<ReturnType<typeof useRecognize>, 'text'>
const placeholderText = 'Transcription will appear here...'

export const RecognizeOutput = React.memo<Props>(({ text }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.textArea}
      value={text}
      placeholder={placeholderText}
      placeholderTextColor="#999"
      editable={false}
      multiline
    />
  </View>
))

const styles = StyleSheet.create({
  container: { marginTop: 24, width: '100%', paddingHorizontal: 16 },
  textArea: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
})
