import React from 'react'
import { Button } from 'react-native'
import { useRecognize } from '../hooks/useRecognize'

type Props = ReturnType<typeof useRecognize>

export const RecognizeButton: React.FC<Props> = ({
  start,
  stopAndRecognize,
  recording,
  loading,
}) => (
  <Button
    title={recording ? 'Stop and recognize' : 'Record audio'}
    onPress={recording ? stopAndRecognize : start}
    disabled={loading}
  />
)
