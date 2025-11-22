import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
const { baleId, phoneNumber, nationalId, inquiry } = await req.json();

if (!baleId || !phoneNumber || !nationalId || !inquiry) {
  return NextResponse.json({ ok: false, error: "Missing parameters" }, { status: 400 });
}

const user = await prisma.user.create({
  data: {
    baleId,
    phone: phoneNumber,
    firstName: inquiry.user.name,
    lastName: inquiry.user.family,
    gender: inquiry.user.gender,
    birthYear: inquiry.user.birth_date?.slice(0, 4),
    nationalId,
    insurance: inquiry.insurance?.title ?? "",
  },
});    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Register user error:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
