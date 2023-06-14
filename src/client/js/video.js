import axios from "axios";

const muteBtn = document.getElementById("muteBtn");
const playBtn = document.getElementById("playBtn");
const video = document.querySelector("video");
const volumeInput = document.getElementById("volumeInput");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");
const timeLine = document.getElementById("timeLine");
const videoContainer = document.querySelector(".video-Container");
const videoController = document.querySelector(".video-Controller");
const fullScreen = document.getElementById("fullScreen");

let videoVolume = 0.5;
let controlTimeout = null;
let controlsMovementTimeout = null;

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

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeLine = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const full = document.fullscreenElement;
  if (full) {
    document.exitFullscreen();
    fullScreen.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreen.innerText = "Exit Full Screen";
  }
};

const handleKey = () => {
  if (event.code === "Space") {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
};

const hideControls = () => videoController.classList.remove("showing");

const handleMove = () => {
  if (controlTimeout) {
    clearTimeout(controlTimeout);
    controlTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoController.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleLeave = () => {
  controlTimeout = setTimeout(hideControls, 3000);
};
const handleView = () => {
  //const id = document.location.pathname.split("/")[2];
  const { id } = videoContainer.dataset;
  axios.post(`/api/videos/${id}/view`);
};

muteBtn.addEventListener("click", handleMute);
playBtn.addEventListener("click", handelPlay);
volumeInput.addEventListener("input", handleVolume);
video.addEventListener("timeupdate", handleUpdate);
video.addEventListener("loadedmetadata", handleMetaData);
timeLine.addEventListener("input", handleTimeLine);
fullScreen.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKey);
video.addEventListener("mousemove", handleMove);
video.addEventListener("mouseleave", handleLeave);
window.addEventListener("load", handleView);
