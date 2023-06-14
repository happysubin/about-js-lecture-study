const fs = require("fs");

const beforeMeM = process.memoryUsage().rss; //사용하고 있는 메모리의 상태를 저장해 놓는다
fs.readFile("11-stream/file.txt", (_, data) => {
  //파일을 다 읽은후
  fs.writeFile("11-stream/file2.txt", data, () => {}); //읽은 데이터를 저장
  //calculate
  const afterMeM = process.memoryUsage().rss;
  const diff = afterMeM - beforeMeM;
  const consumed = diff / 1024 / 1024; //메가 바이트로 출력
  console.log(diff);
  console.log(`Consumed Memory : ${consumed}MB`); //다읽고 다시쓰는데 이정도의 메모리가 들었다
});
