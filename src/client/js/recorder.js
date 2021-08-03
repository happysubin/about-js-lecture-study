const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
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

startBtn.addEventListener("click", handleStart);

//프론트엔드에서 async await을 쓰려면 regenerator-runtime을 인소톨 해야한다1!! promise (then catch)는 그냥 사용가능!!
