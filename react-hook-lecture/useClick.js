import "./styles.css";
import { useEffect, useRef } from "react";

//useRef는 컴포넌트를 선택해서 사용한다
//getElementById와 비슷하다
//리액트에 모든 컴포넌트는 레퍼런스 엘리먼트를 가지고 있다

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef(); //레퍼런스를 이용해 컴포넌트에 접근한다.
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    //componentWillUnmount 시에 이벤트 리스널르 삭제해야해!
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
    //내부에 리턴값을 주므로 이것은 페이지가 종료될 때 실행된다.
  }, []); // 빈배열이므로 시작할 때 처음만 함수가 실행된다. 디펜던시가 바뀔일이 없기 때문이다! 업데이트 경우는 걱정 ㄴㄴ
  return element;
};

export default function App() {
  const onClick = () => {
    console.log("say Hello");
  };
  const title = useClick(onClick);
  return (
    <div className="App">
      <h1 ref={title}> MY Title </h1>
    </div>
  );
}

//useEffect는 componentDidMount 시에 동작한다
