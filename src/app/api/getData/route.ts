import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import { getSessionKeyFromCookie } from "@/utils/session";

export async function GET(request: Request) {
  const client = getRedisClient();
  const sessionKey = getSessionKeyFromCookie();

  if (!sessionKey) {
    return NextResponse.json({ error: "No session found" });
  }

  const { searchParams } = new URL(request.url);
  const step = searchParams.get("step");

  try {
    if (step) {
      // Retrieve specific field from the hash
      const fieldData = await client.hGet(sessionKey, `step${step}`);

      if (!fieldData) {
        return NextResponse.json({ error: `No data found for step ${step}` });
      }

      return NextResponse.json({ [`step${step}`]: JSON.parse(fieldData) });
    } else {
      // Retrieve all fields from the hash
      const allData = await client.hGetAll(sessionKey);

      // Parse JSON strings back into objects
      const parsedData = Object.fromEntries(
        Object.entries(allData).map(([key, value]) => [key, JSON.parse(value)])
      );

      return NextResponse.json(parsedData);
    }
  } catch (err) {
    console.error("Error retrieving data from Redis:", err);
    return NextResponse.json({
      error: "Error retrieving data from Redis.",
    });
  }
}
