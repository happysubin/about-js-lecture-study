const startBtn = document.getElementById("startBtn");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    //사용자의 네비게이터에서 비디오와 오디오를 가져온다. promise 나 async await을 사용!!!
    audio: true,
    video: true,
  });
  console.log(stream);
};

startBtn.addEventListener("click", handleStart);

//프론트엔드에서 async await을 쓰려면 regenerator-runtime을 인소톨 해야한다1!! promise (then catch)는 그냥 사용가능!!
