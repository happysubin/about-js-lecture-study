import "regenerator-runtime";

const video = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");

let stream;
let videoFile;
let recorder;

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
  video.play();
};

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording!";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  //mediaRecorder은 비디오, 오디오 녹화가능!!!
  //MediaStream가 매개변수이다
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    //recorder이 stop 하면 이 이벤트가 실시
    videoFile = URL.createObjectURL(event.data);
    // URL.createObjectURL()의 매개변수는 object 객체 URL을 생성할 File, Blob, MediaSource (en-US) 객체를 필요로합니다. video src에 넣을 url을 만듭니다.
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

init();
startBtn.addEventListener("click", handleStart);
