import fetch from "node-fetch";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
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
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue; //저장된 이전 값을 가져온다
}; //muteBtn을 누를 시

const handlePlayClick = (e) => {
  if (video.paused) {
    //미디어 일시 정지 여부를 Boolean 값으로 반환합니다. -mdn
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
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
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen(); //div 지만 fullScreen을 만든다
    fullScreenIcon.classList = "fas fa-compress";
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

const handleVideoClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handleSpace = (event) => {
  console.log(event.code);
  if (event.code === "Space") {
    //스페이스바가 누르면 실행된다!!!
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  //이 구문을 통해 html data-id 라고 data attribute를 이용해 저장한 data를 dataset을 통해 가져온다!!!
  fetch(`/api/videos/${id}/view`, { method: "POST" }); //일일이 localhost를 쓸 이유 없다.
  //프론트엔드에서는 id를 알지 못해. 그래서 렌더링하는 페이지에서 data를 가져와야한다
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
//input은 옮기기만 해도 값이 변하는데 ,change 는 드래그 한 후 놔야지 값이 변한다

videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("mousemove", handleMouseMove);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
//loadedmetadate 란 비디오에서 움직이는 이미지를 제외한 모든 데이터이다
video.addEventListener("timeupdate", handleTimeUpdate);
//시간이 흐르면 이벤트가 발생한다고 이해하면 편하다!
video.addEventListener("click", handleVideoClick);
//비디오 클릭하면 멈춘다!
video.addEventListener("ended", handleEnded);
//시청을 완료하면 조회수를 올려버리자!!!!

timeLine.addEventListener("input", handleTimeChange);
//타임라인에 값을 변화시키면 비디오의 타임 라인도 변화해야한다!

fullScreenBtn.addEventListener("click", handleFullscreen);
//버튼으로 fullScreen을 관리

window.addEventListener("keydown", handleSpace);
//키가 눌리면 멈춘다 .실행 키는 스페이스바
