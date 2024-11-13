let totalHoursWorked = 0;
let dayCount = 1;
let tracking = true;
const daysWorked = []; // Array to keep track of daily hours, start time, and end time

document.getElementById('addDay').addEventListener('click', function() {
    if (tracking) {
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if (startTime && endTime) {
            const start = Date.parse(`1970-01-01T${startTime}`);
            const end = Date.parse(`1970-01-01T${endTime}`);

            if (!isNaN(start) && !isNaN(end)) {
                let hoursWorked = (end - start) / (1000 * 60 * 60);
                if (hoursWorked < 0) {
                    hoursWorked += 24; // Adjust for midnight crossover
                }

                totalHoursWorked += hoursWorked;
                daysWorked.push({
                    day: dayCount,
                    startTime: convertTo12HourFormat(startTime),
                    endTime: convertTo12HourFormat(endTime),
                    hoursWorked
                });

                displayDaysWorked();
                updateTotalHours();

                dayCount += 1;
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
    updateTotalHours();
});

function displayDaysWorked() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';  // Clear previous content

    daysWorked.forEach((entry, index) => {
        const dayEntry = document.createElement('p');
        dayEntry.textContent = `Day ${entry.day}: Start Time: ${entry.startTime}, End Time: ${entry.endTime}, Hours Worked: ${entry.hoursWorked.toFixed(2)} hours`;
        
        dayEntry.style.cursor = 'pointer';
        dayEntry.addEventListener('click', function() {
            editDayHours(index);
        });
        
        resultDiv.appendChild(dayEntry);
    });
}

function updateTotalHours() {
    document.getElementById('totalHours').textContent = `Total hours worked: ${totalHoursWorked.toFixed(2)} hours`;
}

function editDayHours(dayIndex) {
    const originalEntry = daysWorked[dayIndex];
    const newStartTime = prompt(`Enter new start time for Day ${originalEntry.day} (HH:MM):`, convertTo24HourFormat(originalEntry.startTime));
    const newEndTime = prompt(`Enter new end time for Day ${originalEntry.day} (HH:MM):`, convertTo24HourFormat(originalEntry.endTime));

    if (newStartTime && newEndTime) {
        const start = Date.parse(`1970-01-01T${newStartTime}`);
        const end = Date.parse(`1970-01-01T${newEndTime}`);

        if (!isNaN(start) && !isNaN(end)) {
            let newHoursWorked = (end - start) / (1000 * 60 * 60);
            if (newHoursWorked < 0) {
                newHoursWorked += 24;
            }

            totalHoursWorked -= daysWorked[dayIndex].hoursWorked;
            totalHoursWorked += newHoursWorked;

            daysWorked[dayIndex] = {
                day: originalEntry.day,
                startTime: convertTo12HourFormat(newStartTime),
                endTime: convertTo12HourFormat(newEndTime),
                hoursWorked: newHoursWorked
            };

            displayDaysWorked();
            updateTotalHours();
        } else {
            alert('Invalid time format. Please try again.');
        }
    }
}

function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = (hours % 12) || 12;
    return `${hours12}:${minutes} ${period}`;
}

function convertTo24HourFormat(time12) {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (period === 'PM' && hours !== '12') hours = +hours + 12;
    if (period === 'AM' && hours === '12') hours = '00';
    return `${hours}:${minutes}`;
}
