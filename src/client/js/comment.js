const videoContainer = document.querySelector(".video-Container");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  const span2 = document.createElement("button");
  span2.innerText = "❌";
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = document.querySelector("textarea");
  const id = videoContainer.dataset.id;
  const text = textarea.value;
  if (text === "") return;
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const newCommentId = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
