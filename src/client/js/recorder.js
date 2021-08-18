import "regenerator-runtime";

const video = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");

const init = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  console.log(stream);
  video.srcObject = stream;
  video.play();
};

const handleStart = () => {};

init();
startBtn.addEventListener("click", handleStart);
