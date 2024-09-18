import { cookies } from "next/headers";

// Get session key from cookies (server-side)
export function getSessionKeyFromCookie() {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get("sessionKey");
  return sessionKey ? sessionKey.value : null;
}

// this code is client-side cookie function, server-side cookie setting is done in response or middleware
// export function setSessionKeyInCookie(key: string) {
//   if (typeof document !== "undefined") {
//     document.cookie = `sessionKey=${encodeURIComponent(key)}; path=/;`;
//   }
// }
