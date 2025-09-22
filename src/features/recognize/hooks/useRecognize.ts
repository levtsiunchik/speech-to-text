import {
  RecordingRef,
  startRecording,
  stopRecordingToBytes,
} from '@/src/shared/lib/audio'
import { useState } from 'react'
import { runWhisper } from '../api/whisper'

export const useRecognize = () => {
  const [recording, setRecording] = useState<RecordingRef | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const start = async () => {
    const rec = await startRecording()
    setRecording(rec)
    setText('')
  }

  const stopAndRecognize = async () => {
    if (!recording) return
    setLoading(true)
    try {
      const bytes = await stopRecordingToBytes(recording)
      const result = await runWhisper(bytes)
      setText(result.text || '(no result)')
    } catch (e: any) {
      setText('Error: ' + e.message)
    } finally {
      setRecording(null)
      setLoading(false)
    }
  }

  return { start, stopAndRecognize, recording, text, loading }
}
