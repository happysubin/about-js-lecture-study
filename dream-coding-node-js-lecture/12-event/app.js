const eventEmmiter = require("events");
const emitter = new eventEmmiter();

const callBack = (args) => {
  console.log("First callBack!!!!!!!!!!!!!!", args);
};

emitter.on("event", callBack);
emitter.on("event", (args) => {
  console.log("Second callBack~~~~~~~~~~~~~", args);
});

emitter.emit("event", { name: 1 });
emitter.emit("event", { name: 2 });
emitter.removeListener("event", callBack);
//이벤트를 처리해버리지 않는다 event라는 이벤트의 콜백함수 callback 를 제거하겠다
//따라서 3번째의 첫번째 콜백함수는 처리되지 않는다
emitter.emit("event", { name: 3 });
