import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
const { baleId, phone, nationalId, firstName, lastName, gender, birthYear, insurance } = await req.json();

const user = await prisma.user.create({
  data: {
    baleId,
    phone,
    firstName,
    lastName,
    gender,
    birthYear,
    nationalId,
    insurance,
  },
});
return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Register user error:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
