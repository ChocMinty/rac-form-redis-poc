import { NextResponse } from "next/server";
import { generateUniqueKey, getRedisClient } from "@/lib/redis";
import {
  getSessionKeyFromCookie,
  setSessionKeyInCookie,
} from "@/utils/session";

interface SaveDataRequest {
  field1: string;
  field2: string;
}

export async function POST(request: Request) {
  const client = getRedisClient();
  const formData: SaveDataRequest = await request.json();

  let sessionKey = getSessionKeyFromCookie();
  if (!sessionKey) {
    sessionKey = generateUniqueKey();
    setSessionKeyInCookie(sessionKey);
  }

  try {
    await client.set(sessionKey, JSON.stringify(formData), { EX: 3600 }); // Expiry set to 3600 sec (1 hour)

    return NextResponse.json({ success: true, key: sessionKey });
  } catch (err) {
    console.error("Error saving data to Redis:", err);
    return NextResponse.json({
      success: false,
      error: "Error saving data to Redis.",
    });
  }
}
