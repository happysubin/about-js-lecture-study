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
  const confirmData = useConfirm("Are you sure", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmData}>Delete the world</button>
    </div>
  );
}
