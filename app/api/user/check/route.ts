import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const user = await Prisma.user.findUnique({
    where: { baleId: userId }
  });

  return NextResponse.json({ exists: !!user });
}
