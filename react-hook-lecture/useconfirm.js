import "./styles.css";

const useConfirm = (message = "", callback, rejection) => {
  if (typeof callback !== "function") {
    return;
  }
  if (typeof rejection !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };

  return confirmAction;
};

export default function App() {
  const deleteWorld = () => console.log("delete the world..");
  const abort = () => console.log("Aborted..");
  const confirmData = useConfirm("Are you sure", deleteWorld, abort); // 수행된 내부함수가 리턴된다.
  return (
    <div className="App">
      <button onClick={confirmData}>Delete the world</button>
    </div>
  );
}
