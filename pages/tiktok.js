// pages/tiktok.js

import { useState } from "react";

export default function TikTokPage() {
  const [url, setUrl] = useState("");
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) {
      setError("Harap masukkan URL TikTok.");
      return;
    }

    setError("");
    setDownloadInfo(null);

    try {
      const response = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        setDownloadInfo(data);
      } else {
        setError(data.message || "Gagal mengambil data.");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tiktok Downloader</title>
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

        /* Styles for input and button */
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
        .download-info a {
            color: #58a6ff;
        }
        
        //untuk icon tools canggih
        .tools {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
            gap: 20px; /* Space between the items */
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
            border: 5px solid #161b32;
        }

        .tool i {
            font-size: 40px;
            color: #58a6ff;
        }

        .tool p {
            font-size: 12px;
            color: #8b949e;
            margin-top: 8px;
        }

        .iconraiso {
            width: 50px;
            height: 50px;
            border-radius: 50%; /* Makes the image circular */
            object-fit: cover; /* Ensures the image covers the space */
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
            <i className="fas fa-home"></i> Tiktok Downloader
          </h1>
          <div className="card">
            <h2>Download TikTok Video and Music</h2>
            <div className="input-container">
              <input
                type="text"
                id="tiktok-url"
                placeholder="Enter TikTok video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button id="download-btn" onClick={handleDownload}>
                Download
              </button>
            </div>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
            {downloadInfo && (
              <div className="download-info" id="download-info">
                <h3>Download Information:</h3>
                <p id="video-title">Title: {downloadInfo.title}</p>
                <p>
                  Duration: <span id="video-duration">{downloadInfo.duration}</span>
                </p>
                <a id="video-link" href={downloadInfo.videoUrl} target="_blank" rel="noopener noreferrer">
                  Download Video
                </a>
                <br />
                <a id="music-link" href={downloadInfo.musicUrl} target="_blank" rel="noopener noreferrer">
                  Download Music
                </a>
              </div>
            )}
          </div>
          <div className="overview"></div>
        </div>
        <div className="footer">
          Made with <i className="fas fa-heart"></i> by Minn.
        </div>
      </body>
    </html>
  );
}