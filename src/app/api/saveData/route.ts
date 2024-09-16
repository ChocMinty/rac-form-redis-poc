// app/api/saveData/route.ts

import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import type { Step1FormData, Step2FormData } from "@/types/formData";

interface SaveDataRequest {
  step: number;
  formData: Step1FormData | Step2FormData;
}

export async function POST(req: Request) {
  const client = getRedisClient();
  const { step, formData }: SaveDataRequest = await req.json();

  await client.set(`formData:step${step}`, JSON.stringify(formData));

  return NextResponse.json({ status: "success" });
}
