import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { stringify } from "querystring";

export async function POST(req: Request) {
  try {
const { baleId, phone, nationalId, inquiry } = await req.json();

if (!baleId || !phone || !nationalId || !inquiry) {
  return NextResponse.json({ ok: false, error: "Missing parameters" }, { status: 400 });
}

  return NextResponse.json({ ok: false, error: stringify(baleId) }, { status: 400 });


// const user = await prisma.user.create({
//   data: {
//     baleId,
//     phone: phone,
//     firstName: inquiry.user.name,
//     lastName: inquiry.user.family,
//     gender: inquiry.user.gender,
//     birthYear: inquiry.user.birth_date?.slice(0, 4),
//     nationalId,
//     insurance: inquiry.insurance?.title ?? "",
//   },
// });    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Register user error:", error);
    return NextResponse.json({ ok: false, error: baleId}, { status: 500 });
  }
}
