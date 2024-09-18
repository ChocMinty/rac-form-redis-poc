import { generateUniqueKey } from "@/utils/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionKey = generateUniqueKey();

  const response = NextResponse.json({ sessionKey });

  // Set the cookie (this cookie will be available to the client)
  response.cookies.set("sessionKey", sessionKey, {
    path: "/",
    httpOnly: false,
  });

  return response;
}
