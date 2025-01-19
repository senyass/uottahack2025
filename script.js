//Lofi variables
const lofiButton = document.getElementById('lofi');
const lofi = document.getElementById('lofi-box');

//Rock variables
const rockButton = document.getElementById('rock');
const rock = document.getElementById('rock-box');

//Classical variabes
const classicalButton = document.getElementById('classical');
const classical = document.getElementById('classical-box');

//White Noise variables
const whiteButton = document.getElementById('white');
const white = document.getElementById('white-box');

//Jazz variables 
const jazzButton = document.getElementById('jazz');
const jazz = document.getElementById('jazz-box');

//Whale variables
const whaleButton = document.getElementById('whale');
const whale = document.getElementById('whale-box');


//Audio variables
const audioPlayer = document.getElementById('audio-player');
const audioSource =document.getElementById('audio-source');
const audioTester = document.getElementById('audio-tester');
const audioTesterSource = document.getElementById('audio-tester-source');

//Go button variables
const goButton = document.getElementById('GO');

const playerButtons = document.querySelectorAll(".player-content button");

let selectedButton = null;

function deselectButton(button) {
    button.textContent = 'Select';
    button.style.backgroundColor = ''; // Reset to default color
}

function selectButton(button) {
    if (selectedButton) {
        deselectButton(selectedButton);
    }
    button.textContent = 'Selected';
    button.style.backgroundColor = 'white'; // Change to your desired color
    selectedButton = button;
}

//Lofi button
lofiButton.onclick = () => {
    audioSource.src = "assets/lofi.mp3";
    audioPlayer.load();
};

lofi.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/lofi.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

lofi.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Heavy Metal button
rockButton.onclick = () => {
    audioSource.src = "assets/heavy-metal.mp3";
    audioPlayer.load();
};

rock.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/heavy-metal.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

rock.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Classical button
classicalButton.onclick = () => {
    audioSource.src = "assets/classical.mp3";
    audioPlayer.load();
};

classical.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/classical.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

classical.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//White noise button
whiteButton.onclick = () => {
    audioSource.src = "assets/white-noise.mp3";
    audioPlayer.load();
};

white.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/white-noise.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

white.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Jazz button 
jazzButton.onclick = () => {
    audioSource.src = "assets/jazz.mp3";
    audioPlayer.load();
};

jazz.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/jazz.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

jazz.addEventListener('mouseleave', () => {
    audioTester.pause();
});


//Whales button
whaleButton.onclick = () => {
    audioSource.src = "assets/whale.mp3";
    audioPlayer.load();
};

whale.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/whale.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

whale.addEventListener('mouseleave', () => {
    audioTester.pause();
});


//Go button
goButton.onclick = () => {
    audioPlayer.play();
}

//Select button
playerButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectButton(button);
    });
});




// Initialize DirectionsService, DirectionsRenderer, and the marker for animation
let directionsService;
let directionsDisplay;
let marker; // Moving marker
let map; // Reference to the map
let alarmPlayed = false; // Prevent multiple alarms

function initMap() {
    // Set map options
    const mapOptions = {
        center: { lat: 38.3460, lng: -0.4907 }, // Default center
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // Initialize DirectionsService and DirectionsRenderer
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    // Initialize marker for animation
    marker = new google.maps.Marker({
        map: map,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/bus.png", // Bus icon
            scaledSize: new google.maps.Size(40, 40) // Adjust icon size
        }
    });

    // Initialize Autocomplete for input fields
    initAutocomplete();
}

function calcRoute() {
    const request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.TRANSIT, // Use public transit
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            // Display the route on the map
            directionsDisplay.setDirections(result);

            // Get distance and duration
            const distance = result.routes[0].legs[0].distance.text;
            const duration = result.routes[0].legs[0].duration.text;

            const output = document.getElementById('output');
            output.innerHTML = `
                <div class='alert-info'>
                    From: ${request.origin}.<br>
                    To: ${request.destination}.<br>
                    Transit distance: ${distance}.<br>
                    Duration: ${duration}.
                </div>`;

            // Simulate marker movement along the route
            simulateMovement(result.routes[0], duration);
        } else {
            directionsDisplay.setDirections({ routes: [] });

            document.getElementById('output').innerHTML = `
                <div class='alert-danger'>
                    Could not retrieve transit route. Make sure public transit is available for the selected route.
                </div>`;
        }
    });
}

// Simulate the movement of the marker along the route
function simulateMovement(route, originalDuration) {
    const steps = route.legs[0].steps; // Get the steps of the route
    const totalDuration = route.legs[0].duration.value; // Total duration in seconds
    let timeRemaining = Math.ceil(totalDuration / 60); // Convert to minutes
    const polylinePath = []; // Array to hold the polyline's path

    // Create a polyline for the simulated route
    const polyline = new google.maps.Polyline({
        path: [],
        strokeColor: "#00bcd4", // Route line color
        strokeWeight: 4,
        map: map
    });

    // Decode the polyline for each step and push to the path
    steps.forEach((step) => {
        const stepPath = google.maps.geometry.encoding.decodePath(step.polyline.points);
        polylinePath.push(...stepPath);
    });

    let pointIndex = 0;
    const stepDuration = totalDuration / polylinePath.length; // Approx time per polyline point in seconds

    function moveMarker() {
        if (pointIndex >= polylinePath.length) return; // Stop when all points are done

        // Move the marker to the next point
        marker.setPosition(polylinePath[pointIndex]);
        pointIndex++;

        // Update the "Time Remaining" every minute
        const currentPointTime = (pointIndex * stepDuration) / 60; // Time passed in minutes
        const newTimeRemaining = Math.ceil(totalDuration / 60 - currentPointTime);

        if (newTimeRemaining < timeRemaining) {
            timeRemaining = newTimeRemaining; // Update only when time decreases

            // Update output
            const output = document.getElementById('output');
            output.innerHTML = `
                <div class='alert-info'>
                    From: ${route.legs[0].start_address}.<br>
                    To: ${route.legs[0].end_address}.<br>
                    Transit distance: ${route.legs[0].distance.text}.<br>
                    Duration: ${originalDuration}.<br>
                    Time Remaining: ${timeRemaining} min.
                </div>`;
        }

        // Play alarm when exactly 3 minutes are remaining
        if (timeRemaining === 3 && !alarmPlayed) {
            playAlarm();
            alarmPlayed = true;
        }

        setTimeout(moveMarker, 100); // Move every 100ms
    }

    moveMarker(); // Start the animation
}

// Function to play the alarm sound
function playAlarm() {
    const alarm = document.getElementById('alarmSound');
    alarm.play();
}

// Initialize Autocomplete for input fields
function initAutocomplete() {
    const options = {
        types: ['geocode'], // Allows address-based input
        componentRestrictions: { country: 'ca' } // Restrict to Canadian addresses
    };

    const input1 = document.getElementById('from');
    const autocomplete1 = new google.maps.places.Autocomplete(input1, options);

    const input2 = document.getElementById('to');
    const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

    // Add event listeners for place selection
    autocomplete1.addListener('place_changed', () => {
        const place = autocomplete1.getPlace();
        console.log(`Selected Origin: ${place.formatted_address}`);
    });

    autocomplete2.addListener('place_changed', () => {
        const place = autocomplete2.getPlace();
        console.log(`Selected Destination: ${place.formatted_address}`);
    });
}
