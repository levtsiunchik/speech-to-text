import { uriToBytes } from "@/src/shared/lib/file";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useCallback, useEffect, useState } from "react";
import { runWhisper } from "../api/whisper";

export const useRecognize = () => {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const permissions = await AudioModule.requestRecordingPermissionsAsync();
      if (!permissions.granted) throw new Error("Microphone permission denied");
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    })();
  }, []);

  const start = useCallback(async () => {
    setText("");
    await recorder.prepareToRecordAsync();
    recorder.record();
  }, [recorder]);

  const stopAndRecognize = useCallback(async () => {
    if (!state.isRecording) return;
    setLoading(true);
    try {
      await recorder.stop();
      const uri = state.url || recorder.uri;
      if (!uri) throw new Error("No recording URI");
      const bytes = await uriToBytes(uri);
      const result = await runWhisper(bytes);
      setText(result.text || "(no text)");
    } catch (e: any) {
      setText("Error: " + (e?.message ?? String(e)));
    } finally {
      setLoading(false);
    }
  }, [recorder, state.isRecording, state.url]);

  return {
    start,
    stopAndRecognize,
    isRecording: state.isRecording,
    text,
    loading,
  };
};
