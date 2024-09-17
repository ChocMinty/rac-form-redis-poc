import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import { getSessionKeyFromCookie } from "@/utils/session";

interface GetDataRequest {
  key: string;
}

export async function POST(request: Request) {
  const client = getRedisClient();
  const { key }: GetDataRequest = await request.json();

  // Use session key if no specific key is provided
  const sessionKey = key || getSessionKeyFromCookie();

  if (!sessionKey) {
    return NextResponse.json({
      success: false,
      error: "Session key not found.",
    });
  }

  try {
    const data = await client.get(sessionKey);

    if (data) {
      return NextResponse.json({ success: true, data: JSON.parse(data) });
    } else {
      return NextResponse.json({
        success: false,
        error: "Data not found or expired.",
      });
    }
  } catch (err) {
    console.error("Error fetching data from Redis:", err);
    return NextResponse.json({
      success: false,
      error: "Error fetching data from Redis.",
    });
  }
}
