export default async function handler(req, res) {
  const { get_video } = req.query;

  if (!get_video) {
    return res.status(400).json({ message: "URL video diperlukan." });
  }

  try {
    const response = await fetch(
      `https://apiv2.anthiago.com/transkrip?get_video=${encodeURIComponent(
        get_video
      )}&codeL=id`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Referer: "https://anthiago.com/",
          "User-Agent": "Mozilla/5.0",
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