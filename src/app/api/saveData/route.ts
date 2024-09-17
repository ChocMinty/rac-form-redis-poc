import { NextResponse } from "next/server";
import { generateUniqueKey, getRedisClient } from "@/lib/redis";
import {
  getSessionKeyFromCookie,
  setSessionKeyInCookie,
} from "@/utils/session";
import { Step1FormData, Step2FormData } from "@/types/formData";

interface SaveDataRequest {
  step: number;
  formData: Step1FormData | Step2FormData;
}

export async function POST(request: Request) {
  const client = getRedisClient();
  const requestData: SaveDataRequest = await request.json();

  let sessionKey = getSessionKeyFromCookie();
  if (!sessionKey) {
    sessionKey = generateUniqueKey();
    setSessionKeyInCookie(sessionKey);
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
    return NextResponse.json({
      success: false,
      error: "Error saving data to Redis.",
    });
  }
}
