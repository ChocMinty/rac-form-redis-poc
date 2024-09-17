export function getSessionKeyFromCookie(): string | null {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp("(^| )sessionKey=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }
  return null;
}

export function setSessionKeyInCookie(key: string) {
  if (typeof document !== "undefined") {
    document.cookie = `sessionKey=${encodeURIComponent(key)}; path=/;`;
  }
}
