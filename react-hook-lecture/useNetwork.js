import { useEffect, useRef, useState } from "react";
import "./styles.css";

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine); //우리 웹사이트가 online 인지 offline인지 알려준다
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};

export default function App() {
  const handleNetworkChange = () => {
    console.log(onLine ? "we just went online" : "we are offLinge");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      <h1> {onLine ? "Online" : "offline"}</h1>
    </div>
  );
}
