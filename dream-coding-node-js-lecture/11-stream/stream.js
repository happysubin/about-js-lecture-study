const fs = require("fs");
const data = [];

const readStream = fs.createReadStream("11-stream/file.txt", {
  highWaterMark: 8, //한번에 얼마나 읽어올지 정할 수 있다. 기본은 64 kbytes
  encoding: "utf-8", // 그냥 기본적인 버퍼가 아닌 인코딩해서
});
//이러면 한번만 실행해서 처음 받아온 데이터만 출력한다.
readStream.once("data", (chunk) => {
  //console.log(chunk);
  data.push(chunk); //덩어리들을 배열에다가 저장했다
  console.count("data");
});
//readStream 에서 on 이라는 api를 이용해 데이터가 들어오면 (chunk: 한 부분적인 버퍼의 덩어리) (string 인코딩 하면 문자열일 수 도 있따)

readStream.on("end", () => {
  console.log(data.join(""));
});
readStream.on("error", (error) => {
  console.log(error);
});
