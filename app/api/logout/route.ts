import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ success: true });

  res.cookies.delete("token");
  res.cookies.delete("csrf");

  return res;
}
