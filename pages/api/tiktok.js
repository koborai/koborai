export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "URL video diperlukan." });
  }

  try {
    const response = await fetch(
      `https://api.tiktok.com/video/download?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Referer: "https://tiktok.com/",
          "User -Agent": "Mozilla/5.0",
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan." });
  }
}