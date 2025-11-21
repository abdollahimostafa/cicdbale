import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { exists: false, error: "Missing userId" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { baleId: userId },
    });

    return NextResponse.json({ exists: !!user, user: user ?? null });
  } catch (err) {
    console.error("API /user/check error:", err);
    return NextResponse.json(
      { exists: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
