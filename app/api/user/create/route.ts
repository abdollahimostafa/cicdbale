import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, phone } = await req.json();

    if (!userId || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing userId or phone" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { baleId: userId },
    });

    if (existingUser) {
      return NextResponse.json({ ok: true, user: existingUser });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        baleId: userId,
        phone,
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error("API /user/create error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
