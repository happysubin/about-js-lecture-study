const videoContainer = document.querySelector(".video-Container");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = document.querySelector("textarea");
  const id = videoContainer.dataset.id;
  const text = textarea.value;
  if (text === "") return;
  fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
