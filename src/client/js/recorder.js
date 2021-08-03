const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  //mediaRecorder은 비디오, 오디오 녹화가능!!!
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    //이 이벤트는 최종 비디오 파일과 함께 나온다
    //ondataaavailable
    //console.log(event)
    const videoFile = URL.createObjectURL(event.data); //브라우저 메모리에서만 가능한 url을 만들어준다. 즉 브라우저의 메모리를 가리키는 url이다! 대충 파일을 가리킨다고 생각!
    console.log(video);
    video.srcObject = null;
    video.src = videoFile; //video url을 설정
    video.loop = true; //비디오 반복재생
    video.play();
  };

  recorder.start();

  //setTimeout(() => recorder.stop(), 10000); //10초 뒤 녹화 종료
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    //사용자의 네비게이터에서 비디오와 오디오를 가져온다. promise 나 async await을 사용!!!
    audio: false,
    video: true,
  });
  video.srcObject = stream; //비디오 내부 srcObject객체에 stream 값을 할당
  //htmlMediaelement.srcObject를 이용해 프리뷰를 보는게 가능하다
  //mdn 설명 HTMLMediaElement와 연결된 미디어의 원본 역할을 하는 개체를 설정하거나 반환합니다. 원본은 우리 컴퓨터에서 가져온다.
  //The srcObject property of the HTMLMediaElement interface sets or returns the object which serves as the source of the media associated with the HTMLMediaElement.
  video.play();
};

init();
startBtn.addEventListener("click", handleStart);

//프론트엔드에서 async await을 쓰려면 regenerator-runtime을 인소톨 해야한다1!! promise (then catch)는 그냥 사용가능!!
