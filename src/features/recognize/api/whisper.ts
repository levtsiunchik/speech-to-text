import { getCreds } from "@/src/shared/lib/creds";

export type WhisperWord = { word: string; start: number; end: number };
export type WhisperResult = {
  text: string;
  word_count?: number;
  words?: WhisperWord[];
  vtt?: string;
};

export const runWhisper = async (bytes: Uint8Array): Promise<WhisperResult> => {
  const { id, token } = await getCreds();
  if (!id || !token) {
    throw new Error("Set Cloudflare Account ID and API Token in Settings");
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/@cf/openai/whisper`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
    },
    body: bytes,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Whisper HTTP ${res.status}: ${msg}`);
  }

  const json = await res.json().catch(() => ({}));
  const payload = json?.result ?? json;
  if (!payload?.text) throw new Error('Whisper response missing "text"');

  return payload as WhisperResult;
};
