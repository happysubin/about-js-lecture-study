import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const sayHello = () => {
    console.log("hello");
  };
  const [number, setNumber] = useState(0);
  const [anumber, asetNumber] = useState(0);
  useEffect(sayHello, [number]); //첫번째 매개변수는 함수이고 두 번째 매개변수는 의존값이다.
  //의존값이 바뀌면 첫번째 함수가 실행된다.
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button value={number} onClick={() => setNumber(number + 1)}>
        Plus
      </button>
      <h1>{number}</h1>
      <button onClick={() => asetNumber(anumber + 1)}>Plus</button>
      <h1>{anumber}</h1>
    </div>
  );
}
