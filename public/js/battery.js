        // Fungsi untuk memperbarui status baterai
function updateBatteryStatus() {
    navigator.getBattery().then(function(battery) {
        const level = (battery.level * 100).toFixed(0); // Battery level as a percentage
        const charging = battery.charging ? "Charging" : "Not Charging";
        
        // Display battery level and charging status
        document.getElementById('batteryLevel').textContent = `${level}% - ${charging}`;
    });
}

// Panggil fungsi untuk memperbarui status baterai
updateBatteryStatus();

// Opsional: Perbarui status baterai setiap 10 detik
setInterval(updateBatteryStatus, 10000);