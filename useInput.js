export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

/*
import React, { useState } from "react";
import "./styles.css";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};
//value.include("@") 이걸 검사 @를 눌러도 동작하지 않는다
const App = () => {
  const [item, setItem] = useState(1);
  //const item =useState(1)[0] || useState(1)[1];
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  const maxLen = (value) => value.length <= 10;
  const name = useInput("MR.", maxLen);
  console.log(name.value);
  return (
    <div className="App">
      <h1>Hello CodeSandbox {item} </h1>
      <h2>Edit to see some magic happen!</h2>
      <button onClick={incrementItem}>plus </button>
      <button onClick={decrementItem}>minus</button>
      <input placeholder="name" {...name} />
    </div>
  );
};
//<input placeholder="name" value={name.value} onChange={name.onChange}/>도 가능
export default App;

*/
