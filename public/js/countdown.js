function countdown() {
    const eventDate = new Date("March 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = eventDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent = `${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
}

// Update countdown every second
setInterval(countdown, 1000);

// Initial countdown update
countdown();



