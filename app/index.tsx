import { RecognizeButton } from '@/src/features/recognize/components/RecognizeButton'
import { RecognizeOutput } from '@/src/features/recognize/components/RecognizeOutput'
import { useRecognize } from '@/src/features/recognize/hooks/useRecognize'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const RecognizeTextScreen: React.FC = () => {
  const recognize = useRecognize()

  return (
    <View style={styles.container}>
      <RecognizeButton {...recognize} />
      <RecognizeOutput text={recognize.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
})
export default RecognizeTextScreen
