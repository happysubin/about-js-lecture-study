import { useRef } from "react";
import "./styles.css";

//알림이 실행되는 function을 만든다

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        })
        .catch();
    } else {
      new Notification(title, options);
    }
  };

  return fireNotif;
};

export default function App() {
  const triggerNotify = useNotification("Can i steal your kimchi", {
    body: "i love meat",
  });
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <button onClick={triggerNotify}>Hello</button>
    </div>
  );
}
