const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handleMute = (e) => {}; //muteBtn을 누를 시

const handlePlayClick = (e) => {
  if (video.pause) {
    //미디어 일시 정지 여부를 Boolean 값으로 반환합니다. -mdn
    video.play();
  } else {
    video.pause();
  }
}; //palyBtn을 누를 시

const handlePause = (e) => {
  playBtn.innerText = "Play";
}; //비디오가 멈출 시

const handlePlay = (e) => {
  playBtn.innerText = "Pause";
}; //비디오가 작동되는 동안

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
