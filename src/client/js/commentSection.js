const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  //로그인하지않으면 에러가 발생한다  따라서 함수 안으로 옮기자!
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //헤더는 req요청을 할 때 부가적인 정보, 세부사항 을 가지고 있다.
    //"Content-Type": "application/json"  우리는 이를 통해 백엔드에 json 형식을 전달한다는 의미를 포함하고 있다!
    body: JSON.stringify({ text }), //fetch 로는 보통 json 데이터를 보낸다.json 형식을 문자열로 바꾸어서 백엔드에 요청을 보낸다
  }); //from 과 같이 req.body로 보낸다. from 없이 req.body로 보내는 방법!
  textarea.value = "";
};

//두번째 해결방법 form이 있는 지 검사
if (form) {
  form.addEventListener("submit", handleSubmit);
}
