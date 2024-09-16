import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import type { Step1FormData, Step2FormData } from "@/types/formData";

interface GetDataResponse {
  formData?: Step1FormData | Step2FormData;
  error?: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const step = url.searchParams.get("step");

  if (!step) {
    return NextResponse.json(
      { error: "Step parameter is missing" } as GetDataResponse,
      { status: 400 }
    );
  }

  const client = getRedisClient();
  const data = await client.get(`formData:step${step}`);

  if (data) {
    const formData = JSON.parse(data) as Step1FormData | Step2FormData;
    return NextResponse.json({ formData } as GetDataResponse);
  } else {
    return NextResponse.json(
      { error: "Session expired or data not found" } as GetDataResponse,
      { status: 404 }
    );
  }
}
