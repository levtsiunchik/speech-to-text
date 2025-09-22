import { Audio } from "expo-av"

export type RecordingRef = Audio.Recording

export const startRecording = async (): Promise<RecordingRef> => {
  const { granted } = await Audio.requestPermissionsAsync()
  if (!granted) throw new Error("Доступ к микрофону отклонён")

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  })

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  )

  return recording
}


export const stopRecordingToBytes = async (rec: RecordingRef): Promise<Uint8Array> => {
  await rec.stopAndUnloadAsync()
  const uri = rec.getURI()
  if (!uri) throw new Error("Could not get recording URI")

  const res = await fetch(uri)
  if (!res.ok) throw new Error(`Could not read the file: ${res.status}`)

  const blob = await res.blob()
  const buf = await blob.arrayBuffer()
  return new Uint8Array(buf)
}