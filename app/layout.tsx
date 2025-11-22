export const metadata = { title: 'Balconista de Farmácia Profissional' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{background:'#FFFFFF', color:'#1F2937', margin:0}}>
        <header style={{padding:16, background:'#1E88E5', color:'#fff'}}>
          <div style={{display:'flex', gap:16, alignItems:'center', justifyContent:'space-between'}}>
            <strong>Balconista de Farmácia</strong>
            <nav style={{display:'flex', gap:12}}>
              <a href="/" style={{color:'#fff'}}>Dashboard</a>
              <a href="/admin" style={{color:'#fff'}}>Admin</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
