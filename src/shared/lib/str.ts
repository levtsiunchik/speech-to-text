export const getErrorMessage = (e: any): string => {
  if (e?.errors && Array.isArray(e.errors) && e.errors[0]?.message) {
    return e.errors[0].message;
  }
  if (typeof e?.message === "string") {
    const match = e.message.match(/Whisper HTTP (\d+): (.*)/);
    if (match) {
      try {
        const json = JSON.parse(match[2]);
        if (
          json.errors &&
          Array.isArray(json.errors) &&
          json.errors[0]?.message
        ) {
          return json.errors[0].message;
        }
        return `HTTP ${match[1]}: ${json?.message || "Unknown error"}`;
      } catch {
        return e.message;
      }
    }
    return e.message;
  }
  return "Something went wrong.";
};
