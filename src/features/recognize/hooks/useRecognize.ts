import type { RecordingRef } from '@/shared/lib/audio'
import { startRecording, stopRecordingToBytes } from '@/src/shared/lib/audio'
import { useCallback, useRef, useState } from 'react'
import { runWhisper } from '../api/whisper'

export const useRecognize = () => {
  const recRef = useRef<RecordingRef | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const start = useCallback(async () => {
    const rec = await startRecording()
    recRef.current = rec
    setIsRecording(true)
    setText('')
  }, [])

  const stopAndRecognize = useCallback(async () => {
    if (!recRef.current) return
    setLoading(true)
    try {
      const bytes = await stopRecordingToBytes(recRef.current)
      recRef.current = null
      const result = await runWhisper(bytes)
      setText(result.text || '(no result)')
    } catch (e: any) {
      setText('Error: ' + e.message)
    } finally {
      setIsRecording(false)
      setLoading(false)
    }
  }, [])

  return { start, stopAndRecognize, isRecording, text, loading }
}
