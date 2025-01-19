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
    audioSource.src = "assets/whales.mp3";
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