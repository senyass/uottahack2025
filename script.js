const lofiButton = document.getElementById('lofi');
const heavyButton = document.getElementById('heavy-metal');
const whalesButton = document.getElementById('whales');
const whiteButton = document.getElementById('white-noise');
const jazzButton = document.getElementById('jazz');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const audioTester = document.getElementById('audio-tester');
const audioTesterSource = document.getElementById('audio-tester-source');
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

lofiButton.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/lofi.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

lofiButton.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Heavy Metal button
heavyButton.onclick = () => {
    audioSource.src = "assets/heavy-metal.mp3";
    audioPlayer.load();
};

heavyButton.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/heavy-metal.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

heavyButton.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Whales button
whalesButton.onclick = () => {
    audioSource.src = "assets/whales.mp3";
    audioPlayer.load();
};

whalesButton.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/whale.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

whalesButton.addEventListener('mouseleave', () => {
    audioTester.pause();
});


//White noise button
whiteButton.onclick = () => {
    audioSource.src = "assets/white-noise.mp3";
    audioPlayer.load();
};

whiteButton.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/white-noise.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

whiteButton.addEventListener('mouseleave', () => {
    audioTester.pause();
});

//Jazz button 
jazzButton.onclick = () => {
    audioSource.src = "assets/jazz.mp3";
    audioPlayer.load();
};

jazzButton.addEventListener('mouseenter', () => {
    audioTesterSource.src = "assets/jazz.mp3";
    audioTester.load();
    audioTester.currentTime = 0;
    audioTester.play();
});

jazzButton.addEventListener('mouseleave', () => {
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