import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Redirect ke halaman 404 jika slug tidak valid
    if (slug) {
      router.replace("/404"); // Mengarahkan ke halaman 404 bawaan Next.js
    }
  }, [slug, router]);

  // Sambil menunggu slug terdefinisi
  if (!slug) return <div>Loading...</div>;

  // Tidak ada konten di sini, hanya mengarahkan slug tak dikenal ke 404
  return null;
}