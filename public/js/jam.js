        // Function to update the time
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
            
            // Display the time in the 'jam' div
            document.getElementById('jam').textContent = timeString;
        }

        // Update the time every second
        setInterval(updateTime, 1000);

        // Initial time update
        updateTime();
        
       