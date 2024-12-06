export default async function handler(req, res) {
  const { url, format } = req.query;

  // Validasi parameter
  if (!url || !format) {
    return res.status(400).json({ message: "URL dan format diperlukan." });
  }

  const validAudioFormats = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav', '4k'];
  const validVideoFormats = ['360', '480', '720', '1080', '1440'];

  if (![...validAudioFormats, ...validVideoFormats].includes(format)) {
    return res.status(400).json({ message: "Format tidak valid." });
  }

  try {
    const apiUrl = `https://p.oceansaver.in/ajax/download.php?copyright=0&format=${encodeURIComponent(
      format
    )}&url=${encodeURIComponent(url)}`;

    // Permintaan awal untuk memulai proses download
    const initialResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "MyApp/1.0",
        Referer: "https://ddownr.com/enW7/youtube-video-downloader",
      },
    });

    if (!initialResponse.ok) {
      return res.status(initialResponse.status).json({
        message: "Pastikan URL yang dimasukkan valid.",
      });
    }

    const initialData = await initialResponse.json();
    const downloadId = initialData.id;

    // Fungsi untuk memantau progres
    const checkProgress = async (id) => {
      const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

      while (true) {
        const progressResponse = await fetch(progressUrl, {
          method: "GET",
          headers: {
            "User-Agent": "MyApp/1.0",
            Referer: "https://ddownr.com/enW7/youtube-video-downloader",
          },
        });

        if (!progressResponse.ok) {
          throw new Error("Gagal memantau progres.");
        }

        const progressData = await progressResponse.json();

        // Jika download selesai (progress === 1000)
        if (progressData.progress === 1000) {
          return progressData.download_url;
        }

        // Tunggu 1 detik sebelum cek lagi
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    // Tunggu hingga proses selesai
    const downloadUrl = await checkProgress(downloadId);

    const result = {
      author: "Minn",
      success: true,
      format: format,
      title: initialData.title || "Tidak tersedia",
      thumbnail: initialData.info?.image || "Tidak tersedia",
      downloadUrl: downloadUrl || "Tidak tersedia",
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}