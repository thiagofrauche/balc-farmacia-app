import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'course_dataset.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    await prisma.question.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.module.deleteMany();

    const modules = data.course.modules as any[];
    for (const m of modules) {
      const mod = await prisma.module.create({
        data: { order: m.id, title: m.title, minutes: 20 }
      });
      for (const t of m.topics) {
        const topic = await prisma.topic.create({
          data: { moduleId: mod.id, title: t.title, content: t.content }
        });
        for (const q of t.questions) {
          await prisma.question.create({
            data: {
              moduleId: mod.id,
              topicId: topic.id,
              prompt: q.prompt,
              options: q.options,
              correctIndex: q.correctIndex,
              explanation: q.explanation ?? null
            }
          });
        }
      }
    }
    return NextResponse.json({ ok: true, message: 'Seed concluído' });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status: 500 });
  }
}
