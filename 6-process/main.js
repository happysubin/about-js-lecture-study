const process = require("process");
console.log(process.env);
process.nextTick(function () {
  //process.nextTick 이벤트루프가 다른콜백함수를 다 수행하고나서 nextTick 콜백함수를 우선처리하게한다
  console.log("hi");
});
