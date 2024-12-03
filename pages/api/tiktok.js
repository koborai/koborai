// pages/api/tiktok.js

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL video diperlukan." });
  }

  try {
    const response = await fetch("https://tokdl.com/wp-json/aio-dl/video-data/", {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://tokdl.com",
        "Referer": "https://tokdl.com/tiktok-video-downloader/",
        "User -Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
      },
      body: new URLSearchParams({
        url: url,
        hash: "aHR0cHM6Ly92dC50aWt0b2suY29tL1pTakdWRmNTMy8=1032YWlvLWRs",
        token: "e784127b33f9d3d92597677969f6fd57e7aaa8aa88330fb0a7aeb30378dae968",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan." });
  }
}