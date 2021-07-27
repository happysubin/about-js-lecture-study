const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

let volumeValue = 0.5;
video.volume = volumeValue;

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    // video.mute : 설정하면 오디오가 나오지 않습니다. 기본 값은 false이며 이는 비디오가 재생되면 오디오도 같이 재생됨을 의미합니다. -mdn
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "mute";
  volumeRange.value = video.muted ? 0 : volumeValue; //저장된 이전 값을 가져온다
}; //muteBtn을 누를 시

const handlePlayClick = (e) => {
  if (video.paused) {
    //미디어 일시 정지 여부를 Boolean 값으로 반환합니다. -mdn
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Paused";
}; //palyBtn을 누를 시

const handleVolume = (event) => {
  const value = event.target.value;
  if (video.muted) {
    //비디오가 안들린다면
    video.muted = false;
    muteBtn.innerText = "mute";
  }
  volumeValue = value;
  video.volume = value;
  if (video.volume === 0) muteBtn.innerText = "Unmute";
  else muteBtn.innerText = "mute";
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
//input은 옮기기만 해도 값이 변하는데 ,change 는 드래그 한 후 놔야지 값이 변한다
