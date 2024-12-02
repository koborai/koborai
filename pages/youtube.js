import Head from "next/head";
import Link from "next/link";
import Script from 'next/script';
import { useEffect } from "react";

export default function YoutubePage() {
  useEffect(() => {
    const qualityOptions = {
      video: ['144p', '240p', '360p', '480p', '720p'],
      audio: ['128kbps', '192kbps']
    };

    function updateQualityOptions() {
      const mediaType = document.getElementById("mediaType").value;
      const qualitySelect = document.getElementById("quality");
      qualitySelect.innerHTML = '';

      qualityOptions[mediaType].forEach(quality => {
        const option = document.createElement("option");
        option.value = quality.replace('p', '').replace('kbps', '');
        option.textContent = quality;
        qualitySelect.appendChild(option);
      });
    }

    // Memastikan updateQualityOptions dipanggil saat pertama kali komponen dimuat
    updateQualityOptions(); // Menambahkan pemanggilan fungsi langsung setelah render pertama kali

    async function fetchVideoDetails() {
      const url = document.getElementById("url").value;
      const type = document.getElementById("mediaType").value;
      const quality = document.getElementById("quality").value;
      const resultDiv = document.getElementById("result");
      const downloadButton = document.getElementById("downloadButton");

      if (!url) {
        alert("Please enter a YouTube URL.");
        return;
      }

      try {
        downloadButton.disabled = true;
        downloadButton.textContent = "Loading...";

        const response = await fetch(`https://cdn59.savetube.su/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status === false) {
          resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
          return;
        }

        const videoData = data.data;
        resultDiv.innerHTML = `
          <h3>${videoData.title}</h3>
          <img src="${videoData.thumbnail_formats[0].url}" id="thumbnail" alt="Thumbnail">
          <p>Duration: ${videoData.durationLabel}</p>
          <p><a href="#" onclick="downloadMedia('${type}', '${quality}', '${videoData.key}')">Download ${type === 'audio' ? 'Audio' : 'Video'}</a></p>
        `;
      } catch (error) {
        console.error("Error fetching video details:", error);
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      } finally {
        downloadButton.disabled = false;
        downloadButton.textContent = "Download";
      }
    }

    async function downloadMedia(type, quality, key) {
      const resultDiv = document.getElementById("result");
      const downloadButton = document.getElementById("downloadButton");

      try {
        downloadButton.disabled = true;
        downloadButton.textContent = "Downloading...";

        const url = type === 'audio'
          ? `https://cdn51.savetube.su/download/audio/${quality}/${key}`
          : `https://cdn51.savetube.su/download/video/${quality}/${key}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data && data.data && data.data.downloadUrl) {
          const downloadUrl = data.data.downloadUrl;
          window.open(downloadUrl, "_blank");
        } else {
          resultDiv.innerHTML = "<p>Download URL tidak ditemukan.</p>";
        }
      } catch (error) {
        console.error("Error downloading media:", error);
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      } finally {
        downloadButton.disabled = false;
        downloadButton.textContent = "Download";
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Youtube Downloader</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="icon" href="/img/icon.png" />
        <style>{`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #161b22 ;
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
            flex-grow: 1;
          }
          .content h1 {
            display: flex;
            align-items: center;
            font-size: 24px;
          }
          .content h1 i {
            margin-right: 10px;
          }
          .card {
            background-color: #161b22;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
          }
          .card p {
            font-size: 14px;
            color: #8b949e;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #8b949e;
            margin-top: auto;
          }
          .footer i {
            color: #ff7b72;
          }
          #result {
            margin-top: 20px;
          }
        `}</style>
      </Head>
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
        <h1><i className="fas fa-home"></i>Youtube Downloader</h1>
        <div className="card">
          <p>Download video youtube dengan mudah🔥</p>
          <input type="text" id="url" placeholder="Masukkan URL YouTube" />
          <select id="mediaType" onChange={updateQualityOptions}>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <select id="quality"></select>
          <button id="downloadButton" onClick={fetchVideoDetails}>Download</button>
          <div id="result"></div>
        </div>
      </div>
      <div className="footer">
        Made with <i className="fas fa-heart"></i> by Minn.
      </div>
    </>
  );
}