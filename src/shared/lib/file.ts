export const uriToBytes = async (uri: string): Promise<Uint8Array> => {
  const res = await fetch(uri);
  if (!res.ok) throw new Error(`Read file failed: ${res.status}`);

  const blob = await res.blob();
  const buffer: ArrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
  return new Uint8Array(buffer);
};
