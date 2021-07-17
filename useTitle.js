import "./styles.css";
import { useEffect, useState } from "react";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    //head 태그 내부에 title 태그를 의미
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

export default function App() {
  const titleUpdater = useTitle("Loading..."); //default 값
  setTimeout(() => titleUpdater("home"), 3000);
  return <div className="App"></div>;
}
