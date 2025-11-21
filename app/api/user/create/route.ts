import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, phone } = await req.json();

  const user = await Prisma.user.create({
    data: {
      baleId: userId,
      phone: phone
    }
  });

  return NextResponse.json({ ok: true, user });
}
