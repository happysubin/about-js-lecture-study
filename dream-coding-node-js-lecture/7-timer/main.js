let count = 0;

const interVal = setInterval(
  (f = () => {
    console.log(count++);
  }),
  1000
);
setTimeout(() => {
  console.log("Time out!");
  clearInterval(interVal); //이걸로 멈출 수 있다
}, 6000);
