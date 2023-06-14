const fs = require("fs");
const writeStream = fs.createWriteStream("11-stream/file3.txt");

writeStream.on("finish", () => {
  console.log("finished!");
});

writeStream.write("hello");
writeStream.write("word");

writeStream.end();
//finish 라는 이벤트가 발생하면 finished 를 출력
