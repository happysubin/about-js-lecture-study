import { useEffect } from "react";
import "./styles.css";

//마우스가 페이지를 벗어나면 실행.
const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };

  useEffect(() => {
    if (typeof onBefore === "function") {
      document.addEventListener("mouseleave", handle);
      return () => document.removeEventListener("mouseleave", handle); //return 시 함수를 실행하는 듯.
    } else {
      return;
    }
  }, []);
};

export default function App() {
  const begForLife = () => {
    console.log("plz dont leave");
  };
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello React</h1>
    </div>
  );
}
