import { prisma } from '@/lib/db';

export default async function ModulePage({ params }: { params: { order: string } }){
  const mod = await prisma.module.findFirst({ where: { order: Number(params.order) } });
  if(!mod) return <main style={{padding:24}}>Módulo não encontrado.</main>;
  const topics = await prisma.topic.findMany({ where: { moduleId: mod.id } });
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:24, fontWeight:600}}>{mod.order}. {mod.title}</h1>
      {topics.map(t => (
        <section key={t.id} style={{marginTop:16}}>
          <h2 style={{fontSize:18, fontWeight:600}}>{t.title}</h2>
          <p style={{whiteSpace:'pre-wrap'}}>{t.content}</p>
        </section>
      ))}
    </main>
  );
}
