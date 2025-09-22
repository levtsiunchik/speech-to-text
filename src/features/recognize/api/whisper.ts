export type WhisperWord = {
  word: string;
  start: number;
  end: number;
};

export type WhisperResult = {
  text: string;
  word_count?: number;
  words?: WhisperWord[];
  vtt?: string;
};

const CLOUDFLARE_ACCOUNT_ID = "";
const CLOUDFLARE_API_TOKEN = "";

const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper`;

export const runWhisper = async (bytes: Uint8Array): Promise<WhisperResult> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/octet-stream",
    },
    body: bytes,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Whisper HTTP ${res.status}: ${msg}`);
  }

  const data = await res.json().catch(() => ({}));

  if (!data?.result?.text) {
    throw new Error("Whisper response missing 'text'");
  }

  return data.result as WhisperResult;
};
