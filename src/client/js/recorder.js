import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileurl, filename) => {
  const a = document.createElement("a"); //링크를 만듬
  a.href = fileurl;
  a.download = filename; //다운로드를 시킨다.
  document.body.appendChild(a); //body 안에 a태그를 추가
  a.click(); //사용자가 클릭을 누른것처럼 작동
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/assets/ffmpeg-core.js",
  }); // 무슨일이 일어나는지 check를 위해 log값을 true로
  await ffmpeg.load(); //프로그램 사용 시작한다는 뜻

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  //ffmpeg에서 파일을 하나 만든다. 마지막 인자는 이진 데이터를 가져와야해
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  //i 는 input 이미 존재하는 recording.webm 파일을 input으로 받는다. 변환되어서 output.mp4로 나온다. 다른 명령어 의미는 초당 60프레임으로 인코딩해주는 명령어다
  //브라우저에서 ffempg를 사용해서 콘솔창에서 명령어를 치는게 아니다. 그래서 브라우저에서 명령을 입력해서 작동시키자.
  //콘솔창에 치는 명령어를 브라우저에서 실시한다고 생각하면 간단하다(리눅스처럼!!)
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    // -ss 명령어와 뒤의 시간을 통해 01초의 장면을 가져온다.
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  ); // -frames :v 1 을 이용해 이동한 장면의 스크린샷을 찍는다. 그 스크린샷의 이름은 thumbnail.jpg. 물론 FS 시스템 메모리에 만들어진다
  const mp4File = ffmpeg.FS("readFile", files.output); //outpur.mp4 파일을 읽는다.
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const thumbUrl = URL.createObjectURL(thumbBlob);
  const mp4Url = URL.createObjectURL(mp4Blob);
  //Binary Large Object :blob  Butter는 우리 영상을 나타내는 byte의 배열!
  //mdn-BLOB은 일반적으로 그림, 오디오, 또는 기타 멀티미디어 오브젝트인 것이 보통이지만, 바이너리 실행 코드가 BLOB으로 저장되기도 한다
  // 만들어진 url을 이용해 파일에 접근

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);
  //브라우저가 느려지니 삭제

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);
  //객체들을 메모리에서 삭제
  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  //mediaRecorder은 비디오, 오디오 녹화가능!!!
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" }); //"video/mp4"이렇게 설정하면 mp4로 컴퓨터에 저장된다.
  recorder.ondataavailable = (event) => {
    //이 이벤트는 최종 비디오 파일과 함께 나온다
    //ondataaavailable
    //console.log(event)
    videoFile = URL.createObjectURL(event.data); //브라우저 메모리에서만 가능한 url을 만들어준다. 즉 브라우저의 메모리를 가리키는 url이다! 대충 파일을 가리킨다고 생각!
    //이 url을 통해 파일 참조가능. videoFile은 blob이다 고로 event.data 도 사실 blob였다!
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
actionBtn.addEventListener("click", handleStart);

//프론트엔드에서 async await을 쓰려면 regenerator-runtime을 인소톨 해야한다1!! promise (then catch)는 그냥 사용가능!!
