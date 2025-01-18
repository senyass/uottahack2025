const dreamingButton = document.getElementById('dreaming');
const lucidButton = document.getElementById('lucid-dreaming');
const neonButton = document.getElementById('neonscapes');
const rainButton = document.getElementById('rain-book');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

dreamingButton.onclick = () => {
    audioSource.src = "assets/dreaming.mp3";
    audioPlayer.load();
};

lucidButton.onclick = () => {
    audioSource.src = "assets/lucid-dreaming.mp3";
    audioPlayer.load();
};

neonButton.onclick = () => {
    audioSource.src = "assets/neonscapes.mp3";
    audioPlayer.load();
};

rainButton.onclick = () => {
    audioSource.src = "assets/rain-book.mp3";
    audioPlayer.load();
};