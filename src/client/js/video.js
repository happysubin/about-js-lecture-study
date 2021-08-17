const muteBtn = document.getElementById("muteBtn");
const playBtn = document.getElementById("playBtn");
const video = document.querySelector("video");
const volumeInput = document.getElementById("volumeInput");

let videoVolume = 0.5;

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    volumeInput.value = videoVolume;
  } else {
    video.muted = true;
    volumeInput.value = 0;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
};

const handelPlay = () => {
  if (video.paused) {
    video.play();
    playBtn.innerText = "Stop";
  } else {
    video.pause();
    playBtn.innerText = "Play";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  videoVolume = value;
  video.volume = videoVolume;

  if (video.volume == 0) {
    muteBtn.innerText = "Unmute";
  } else muteBtn.innerText = "Mute";
};

muteBtn.addEventListener("click", handleMute);
playBtn.addEventListener("click", handelPlay);
volumeInput.addEventListener("input", handleVolume);
