console.log("code 1");
console.time("time 0");
setTimeout(() => {
  console.log("setTimeout 0");
  console.timeEnd("time 0");
}, 0);

console.log("code 2");
setImmediate(() => {
  console.log("setImmediate");
});

console.log("code 3");
process.nextTick(() => {
  //태스크 큐에 제일 먼저 들어가서 실행됨
  console.log("process.nextTick");
});
