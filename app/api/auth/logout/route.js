import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("userId");
  return NextResponse.json({ success: true });
}
