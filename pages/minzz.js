import Head from "next/head";

export default function MinzzPage() {
  return (
    <>
      <Head>
        <title>Halaman: Minzz</title>
      </Head>
      <div className="container">
        <header className="header">
          <h1>Selamat datang di Halaman Minzz</h1>
          <p>Ini adalah halaman khusus untuk slug "minzz".</p>
        </header>
        <main className="main">
          <p>Konten khusus untuk Minzz.</p>
        </main>
        <footer className="footer">
          Dibuat dengan 💙 oleh Next.js
        </footer>
      </div>
    </>
  );
}