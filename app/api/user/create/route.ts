import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
const { baleId, phone, nationalId, inquiry } = await req.json();

if (!baleId || !phone || !nationalId || !inquiry) {
  return NextResponse.json({ ok: false, error: "Missing parameters" }, { status: 400 });
}

const user = await prisma.user.create({
  data: {
    baleId: String(baleId),
    phone: String(phone),
    firstName: String(inquiry.user.name ?? ""),
    lastName: String(inquiry.user.family ?? ""),
    gender: String(inquiry.user.gender ?? ""),
    birthYear: String(inquiry.user.birth_date?.slice(0, 4) ?? ""),
    nationalId: String(nationalId),
    insurance: String(inquiry.insurance?.title ?? ""),
  },
});

return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Register user error:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
