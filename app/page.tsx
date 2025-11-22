import { prisma } from '@/lib/db';

async function getModules(){
  return prisma.module.findMany({ orderBy: { order: 'asc' } });
}

export default async function Dashboard(){
  const modules = await getModules();
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:24, fontWeight:600}}>Dashboard</h1>
      <div style={{display:'grid', gap:12, marginTop:16}}>
        {modules.map(m => (
          <div key={m.id} style={{border:'1px solid #E5E7EB', borderRadius:12, padding:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600}}>{m.order}. {m.title}</div>
                <div style={{fontSize:12, opacity:.8}}>{m.minutes ?? 20} min</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <a href={`/modules/${m.order}`} style={{background:'#1E88E5', color:'#fff', padding:'8px 12px', borderRadius:8}}>Abrir</a>
                <a href={`/quiz/${m.order}`} style={{border:'1px solid #1E88E5', color:'#1E88E5', padding:'8px 12px', borderRadius:8}}>Exercícios</a>
              </div>
            </div>
          </div>
        ))}
        {modules.length===0 && <p>Sem módulos. Vá em <strong>/admin</strong> e clique “Carregar dados”.</p>}
      </div>
    </main>
  );
}
