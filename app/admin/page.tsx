'use client'
import { useState } from "react";

export default function AdminPage(){
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string|undefined>();

  const seed = async ()=>{
    setLoading(true); setMsg(undefined);
    const r = await fetch('/api/seed', { method: 'POST' });
    const j = await r.json();
    setLoading(false);
    setMsg(j.ok ? 'Conteúdo carregado com sucesso!' : 'Erro: ' + j.error);
  };

  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:24, fontWeight:600}}>Administração do Curso</h1>
      <p>Certifique-se de que o arquivo <code>/data/course_dataset.json</code> existe no repositório.</p>
      <button onClick={seed} disabled={loading} style={{
        marginTop:16, padding:"10px 16px", borderRadius:10,
        background:"#1E88E5", color:"#fff", border:"none"
      }}>{loading ? 'Carregando…' : 'Carregar dados do curso (seed)'}</button>
      {msg && <p style={{marginTop:12}}>{msg}</p>}
    </main>
  );
}
