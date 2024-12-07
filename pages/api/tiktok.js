export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "URL video diperlukan." });
  }

  try {
    const apiUrl = `https://tiklok-down.vercel.app/api/download?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
        Referer: "https://tiklok-down.vercel.app/",
        "Sec-Ch-Ua": '"Not.A.Brand";v="99", "Chromium";v="124"',
        "Sec-Ch-Ua-Mobile": "?1",
        "Sec-Ch-Ua-Platform": '"Android"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: "Pastikan URL yang kamu masukan sudah benar!." });
    }

    const data = await response.json();

    const result = {
      author: "Minn",
      cover: data.video?.cover || data.video?.dynamic_cover || data.video?.origin_cover || "Tidak tersedia",
      title: data.title || "Tidak tersedia",
      videoUrl: data.video?.noWatermark || "Tidak tersedia",
      duration: data.video?.durationFormatted || "Tidak tersedia",
      musicUrl: data.music?.play_url || "Tidak tersedia",
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}