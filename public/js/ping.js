function checkInternetSpeed() {
    const startTime = Date.now();
    const image = new Image();
    const cacheBuster = startTime + Math.random();
    image.src = `https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?cb=${cacheBuster}`;
    image.onload = function() {
        const endTime = Date.now();
        const ping = endTime - startTime;
        document.getElementById('internetSpeed').textContent = `${ping} ms`;
    };
}

// Initial internet speed check
checkInternetSpeed();

// Optional: Check internet speed every 3 seconds
setInterval(checkInternetSpeed, 3000);



