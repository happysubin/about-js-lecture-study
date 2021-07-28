const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsMovementTimeout = null;
let controlsTimeout = null;
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

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8); //시간을 깔끔하게 보여주는 js trick
//string 을 잘라내서 우리가 이용! 00:00::00 이 부분

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration)); //비디오의 총시간을 가져온다
  timeLine.max = Math.floor(video.duration);
  //타임라인 총길이는 비디오의 길이와 동일!
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    //화면이 꽉찬 element가 있으면 true 없으면 false 를 return
    document.exitFullscreen(); //exit 는 doc 급에서 처리
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen(); //div 지만 fullScreen을 만든다
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    //만약 움직이는데 진행중이면
    clearTimeout(controlsMovementTimeout); //삭제
    controlsMovementTimeout = null;
  }
  //마우스가 안으로 들어왔는데 삭제가 진행중이라면 취소시킨다!
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000); //마우스가 움직일때마다 생성
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    //settimeout이 return 하는 값을 clearTimeout에 값으로 넣으면 setTimeout가 취소된다!
    hideControls; //3초가 지나고 불려진다
  }, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
//input은 옮기기만 해도 값이 변하는데 ,change 는 드래그 한 후 놔야지 값이 변한다

video.addEventListener("loadedmetadata", handleLoadedMetadata);
//loadedmetadate 란 비디오에서 움직이는 이미지를 제외한 모든 데이터이다
video.addEventListener("timeupdate", handleTimeUpdate);
//시간이 흐르면 이벤트가 발생한다고 이해하면 편하다!

timeLine.addEventListener("input", handleTimeChange);
//타임라인에 값을 변화시키면 비디오의 타임 라인도 변화해야한다!

fullScreenBtn.addEventListener("click", handleFullscreen);
//버튼으로 fullScreen을 관리
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("mousemove", handleMouseMove);
