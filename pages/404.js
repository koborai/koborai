import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>404</h1>
          <p style={styles.subtitle}>Oops! Halaman yang Anda cari tidak ditemukan.</p>
        </header>
        <main style={styles.main}>
          <Link href="/">
            <a style={styles.button}>Kembali ke Beranda</a>
          </Link>
        </main>
        <footer style={styles.footer}>
          Dibuat dengan 💙 oleh Minn
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    color: "#333",
    textAlign: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "0 20px",
  },
  header: {
    marginTop: "50px",
  },
  title: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#ff6b6b",
    margin: "0",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginTop: "10px",
  },
  main: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0070f3",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  footer: {
    marginTop: "auto",
    padding: "20px 0",
    fontSize: "14px",
    color: "#888",
  },
};