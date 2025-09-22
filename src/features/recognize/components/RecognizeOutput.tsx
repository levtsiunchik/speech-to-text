import React from 'react'
import { Text, View } from 'react-native'
import { useRecognize } from '../hooks/useRecognize'

type Props = Pick<ReturnType<typeof useRecognize>, 'text'>

export const RecognizeOutput: React.FC<Props> = ({ text }) => (
  <View style={{ marginTop: 20 }}>
    <Text>{text}</Text>
  </View>
)
