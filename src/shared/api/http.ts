export const uploadBytes = async (
  url: string,
  bytes: Uint8Array,
  headers: Record<string, string> = {}
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream", ...headers },
    body: bytes,
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(`HTTP ${res.status}: ${msg}`)
  }
  return res.json()
}
