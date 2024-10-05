let totalHoursWorked = 0;
let dayCount = 1;
let tracking = true;

document.getElementById('addDay').addEventListener('click', function() {
    if (tracking) {
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        
        if (startTime && endTime) {
            // Parse start and end times more robustly for mobile browsers
            const start = Date.parse(`1970-01-01T${startTime}`);
            const end = Date.parse(`1970-01-01T${endTime}`);

            if (!isNaN(start) && !isNaN(end)) {
                let hoursWorked = (end - start) / (1000 * 60 * 60);

                // Adjust for negative values if the work period crosses midnight
                if (hoursWorked < 0) {
                    hoursWorked += 24;
                }

                totalHoursWorked += hoursWorked;
                document.getElementById('result').textContent = `Day ${dayCount}: Hours worked today: ${hoursWorked.toFixed(2)} hours`;
                document.getElementById('totalHours').textContent = `Total hours worked: ${totalHoursWorked.toFixed(2)} hours`;

                // Increment the day count
                dayCount += 1;

                // Clear the time inputs for the next day
                document.getElementById('startTime').value = '';
                document.getElementById('endTime').value = '';
            } else {
                document.getElementById('result').textContent = 'Please enter valid times.';
            }
        } else {
            document.getElementById('result').textContent = 'Please enter valid times.';
        }
    }
});

document.getElementById('stopTracking').addEventListener('click', function() {
    tracking = false;
    document.getElementById('result').textContent = 'Tracking stopped.';
    document.getElementById('totalHours').textContent = `Final total hours worked: ${totalHoursWorked.toFixed(2)} hours`;
});

