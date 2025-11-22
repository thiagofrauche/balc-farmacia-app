import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const order = Number(searchParams.get('order') || '0');
  const mod = await prisma.module.findFirst({ where: { order } });
  if(!mod) return NextResponse.json({ questions: [] });
  const qs = await prisma.question.findMany({ where: { moduleId: mod.id } });
  return NextResponse.json({ questions: qs });
}
