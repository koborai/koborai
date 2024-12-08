import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function YouTubePage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("720"); // Default format
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      setError("Harap masukkan URL YouTube.");
      return;
    }

    setError("");
    setDownloadInfo(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/youtube?url=${encodeURIComponent(url)}&format=${encodeURIComponent(
          format
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        setDownloadInfo(data);
      } else {
        setError(data.message || "Pastikan URL yang kamu masukkan sudah benar!.");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YouTube Downloader</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link rel="icon" href="/img/icon.png" />
        <style>{`
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            display: flex;
            flex-direction: column;
            height: 100vh; /* Menjadikan tinggi halaman penuh */
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #161b22;
        }
        .navbar .logo {
            display: flex;
            align-items: center;
        }
        .navbar .logo i {
            font-size: 24px;
            margin-right: 10px;
        }
        .navbar .icons i {
            font-size: 20px;
            margin-left: 20px;
        }
        .content {
            padding: 20px;
            flex-grow: 1; /* Memanfaatkan ruang yang tersisa */
        }
        .content h1 {
            display: flex;
            align-items: center;
            font-size: 24px;
        }
        .content h1 i {
            margin-right: 10px;
        }
        .content p {
            font-size: 14px;
            color: #8b949e;
        }
        .card {
            background-color: #161b22;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
        .card h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .card p {
            font-size: 14px;
            color: #8b949e;
        }
        .card a {
            display: block;
            color: #58a6ff;
            margin-top: 10px;
        }
        .overview {
            margin-top: 20px;
        }
        .overview .item {
            background-color: #161b22;
            padding: 20px;
            border-radius: 10px;
            margin-top: 10px;
        }
        .overview .item h3 {
            font-size: 16px;
            margin-bottom: 10px;
        }
        .overview .item .value {
            font-size: 24px;
        }
        .overview .item .value.blue {
            color: #58a6ff;
        }
        .overview .item .value.red {
            color: #ff7b72;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #8b949e;
            margin-top: auto; /* Memastikan footer berada di bawah */
        }
        .footer i {
            color: #ff7b72;
        }
        .input-container {
            margin-top: 20px;
        }
        .input-container input {
            width: 100%;
            padding: 10px;
            border: 1px solid #58a6ff;
            border-radius: 5px;
            background-color: #0d1117;
            color: #c9d1d9;
        }
        .input-container button {
            margin-top: 10px;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #58a6ff;
            color: #ffffff;
            cursor: pointer;
            font-size: 16px;
        }
        .input-container button:hover {
            background-color: #4a94d6;
        }
        .download-info {
            margin-top: 20px;
            color: #c9d1d9;
        }
        .download-info h3 {
            font-size: 18px;
            margin-bottom: 5px;
        }
        .download-info img {
            max-width: 100%;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }
        .download-info a {
            display: block;
            margin: 10px 0;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            background-color: #58a6ff;
        }
        .download-info a:hover {
            background-color: #4a94d6;
        }
        .download-info button {
            margin: 10px 0; /* Memberikan jarak antara tombol */
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .download-info button:first-child {
            background-color: #58a6ff; /* Warna tombol Download Video */
            color: white;
        }
        .download-info button:first-child:hover {
            background-color: #4a94d6;
        }
        .download-info button:last-child {
            background-color: #ff7b72; /* Warna tombol Download Musik */
            color: white;
        }
        .download-info button:last-child:hover {
            background-color: #e66b61;
        }
        .tools {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        .tool {
            text-align: center;
            background-color: #161b22;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .tool i {
            font-size: 40px;
            color: #58a6ff;
        }
        .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #58a6ff;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 2s linear infinite;
            margin: 10px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        `}</style>
      </head>
      <body>
        <div className="navbar">
          <div className="logo">
            <i className="fas fa-angle-double-right"></i>
            <span>MINN</span>
          </div>
          <div className="icons">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
        <div className="content">
          <h1>
            <i className="fas fa-download"></i> YouTube Video & Music Downloader
          </h1>
          <div className="card">
            <div className="input-container">
              <input
                type="text"
                placeholder="Masukkan URL YouTube"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #58a6ff",
                  backgroundColor: "#0d1117",
                  color: "#c9d1d9",
                }}
              >
                <option value="mp3">MP3 (Audio)</option>
                <option value="360">360p (Video)</option>
                <option value="480">480p (Video)</option>
                <option value="720">720p (Video)</option>
                <option value="1080">1080p (Video)</option>
                <option value="1440">1440p (Video)</option>
                {/* Tambahkan opsi lainnya */}
              </select>
              <button onClick={handleDownload} disabled={loading}>
                {loading ? "Memproses..." : "Download"}
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {downloadInfo && (
              <div className="download-info">
                <h3>{downloadInfo.title}</h3>
                <img src={downloadInfo.thumbnail} alt="Video Thumbnail" />
                <div>
                  <button
                    onClick={() => window.open(downloadInfo.downloadUrl, "_blank")}
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
            {loading && <div className="loading-spinner"></div>}
          </div>
        </div>
        <div className="footer">
          Made with <i className="fas fa-heart"></i> by Minn.
        </div>
      </body>
    </html>
  );
}
