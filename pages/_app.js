// pages/_app.js

import '../styles/globals.css'; // Mengimpor CSS global
import '../public/styles.css';  // Mengimpor CSS tambahan jika diperlukan

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}