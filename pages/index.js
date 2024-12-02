import Head from "next/head";
import Link from "next/link";
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
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
            margin-top: auto;
          }
          .footer i {
            color: #ff7b72;
          }
          .tools {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
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
            border-radius: 50%;
            object-fit: cover;
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
        < h1><i className="fas fa-home"></i>Dashboard</h1>
        <p>Selamat datang di website ku 🥶🤩🥳🗿.</p>
        <div className="card">
          <h2>Welcome to Minn!</h2>
          <p>Siap memulai hari dengan senyuman😏</p>
        </div>
        <div className="overview">
          <div className="item">
            <h3>Waktu Lokal</h3>
            <div className="value blue" id="jam">Loading...</div>
          </div>
          <div className="item">
            <h3>Kecepatan Internet</h3>
            <div className="value blue" id="internetSpeed">Loading...</div>
          </div>
          <div className="item">
            <h3>Menuju Ramadhan 1446 H</h3>
            <div className="value blue" id="countdown">Loading...</div>
          </div>
          <div className="item">
            <h3>Tools Canggih 🥶</h3>
            <div className="value blue">
              <div className="tools">
                <div className="tool" onClick={() => location.href='ai/index.html'} style={{ cursor: 'pointer' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGasxVFZcsVJOjtnOKZ3kNSmjHr90on75mIg&s" alt="Ai Logo" className="iconraiso" />
                  <p>AI MINN</p>
                </div>
                <div className="tool" onClick={() => location.href='ytdown/index.html'} style={{ cursor: 'pointer' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3axEBte-WbkphWcq-8TEL3uaC2pqwZtCDg&s" alt="YouTube Logo" className="iconraiso" />
                  <p>YouTube Downloader</p>
                </div>
                <div className="tool" onClick={() => location.href='ttdown/index.html'} style={{ cursor: 'pointer' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQpL3Ug5SkM7E2npe9NGwkOxsCVRBQM0AAHNsTB3GV-Vx1kZ7852nthM&s=10" alt="TikTok Logo" className="iconraiso" />
                  <p>TikTok Downloader</p>
                </div>
                <div className="tool" onClick={() => location.href='ngl/index.html'} style={{ cursor: 'pointer' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwJ5uKFQGVR9PdZ6tArI-qtZX9VSqaNxV5g&s" alt="NGL Logo" className="iconraiso" />
                  <p>NGL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        Made with <i className="fas fa-heart"></i> by Minn.
      </div>
      <Script src="js/countdown.js"></Script>
      <Script src="js/jam.js"></Script>
      <Script src="js/ping.js"></Script>
    </>
  );
}