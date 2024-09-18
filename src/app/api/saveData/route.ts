import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import { getSessionKeyFromCookie } from "@/utils/session";
import { Step1FormData, Step2FormData } from "@/types/formData";
import { generateUniqueKey } from "@/utils/mockData";

interface SaveDataRequest {
  step: number;
  formData: Step1FormData | Step2FormData;
}

export async function POST(request: Request) {
  const client = getRedisClient();
  const requestData: SaveDataRequest = await request.json();
  let isNewKey = false;

  let sessionKey = getSessionKeyFromCookie();
  if (!sessionKey) {
    sessionKey = generateUniqueKey();
    isNewKey = true;
    console.log("No session key found, generating new key:", sessionKey);
  }

  try {
    // Use HSET to set a field in the hash
    await client.hSet(
      sessionKey,
      `step${requestData.step}`,
      JSON.stringify(requestData.formData)
    );

    await client.expire(sessionKey, 3600); // 1 hour expiration

    return NextResponse.json({ success: true, key: sessionKey });
  } catch (err) {
    console.error("Error saving data to Redis:", err);
    const response = NextResponse.json({
      success: false,
      error: "Error saving data to Redis.",
    });
    isNewKey &&
      response.headers.set(
        "Set-Cookie",
        `sessionKey=${encodeURIComponent(
          sessionKey
        )}; Path=/; HttpOnly=false; Secure; SameSite=Strict`
      );

    return response;
  }
}
