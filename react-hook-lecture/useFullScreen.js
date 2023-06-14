import { useRef } from "react";
import "./styles.css";

const useFullScreen = (callback) => {
  const element = useRef();

  const makeFullScreen = () => {
    if (element.current) {
      element.current.requestFullscreen();
      if (callback || typeof callback === "function") {
        callback(true);
      }
    }
  };

  const exitFull = () => {
    document.exitFullscreen();
    if (callback || typeof callback === "function") {
      callback(false);
    }
    //element.current 로 채우지만 나올때는 document 이것에 유의!
  };

  return { element, makeFullScreen, exitFull };
};

export default function App() {
  const onFalls = (isFull) => {
    console.log(isFull ? "we are full " : "we are small");
  };

  const { element, makeFullScreen, exitFull } = useFullScreen(onFalls);
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <div ref={element}>
        <img
          src="https://image.shutterstock.com/image-photo/sky-blue-background-cloud-clear-600w-1386181790.jpg"
          alt="no img"
        />
        <button onClick={exitFull}>Exit Screen</button>
      </div>
      <button onClick={makeFullScreen}>Make FullScreen</button>
    </div>
  );
}
