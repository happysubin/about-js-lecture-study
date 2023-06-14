import { useEffect, useState } from "react";
import "./styles.css";

//무언가를 스크롤해서 지나가면 그것의 색깔을 바꿔준다
const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = () => {
    console.log("x :", window.scrollX, "y :", window.scrollY);
    setState({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    //이벤트 리스너 삭제해야하는 걸 잘 기억해두자!!!
  }, []);
  return state;
};

export default function App() {
  const { y } = useScroll();
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        Hello
      </h1>
    </div>
  );
}

//스크롤을 감지하기!
