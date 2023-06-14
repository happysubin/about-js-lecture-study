import { useEffect, useRef } from "react";
import "./styles.css";

const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  //componentDidMount 시 동작
  return { ref: element, style: { opacity: 0 } };
};

export default function App() {
  const fadeInh1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(6, 3);
  return (
    <div className="App">
      <h1 {...fadeInh1}>Hello React</h1>
      <p {...fadeInP}> hhhhhhhi!!!!!</p>
    </div>
  );
}

// <h1 ref={el} style={{opacity:0}}>Hello React</h1> 과 동일
