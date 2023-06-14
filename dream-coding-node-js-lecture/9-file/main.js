const fs = require("fs");

//3

//rename(...., callback(error,data)) 비동기! node js 에서 필요한 일을 다한후에 callback 함수를 호출한다
//try{renameSync(...)} catch(error){} sync를 하면 Blocking 이다. 따로 콜백함수를 전달하지 않는다
//promises.rename().then().catch() promise 형태로 사용한다
try {
  fs.renameSync("9-file/text.txt", "9-file/text-new.txt"); //가급적 사용하지 않는다
  //노드의 경로를 신경쓰자!
} catch (e) {
  console.error(e);
}

console.log("성공");

fs.rename("9-file/text-new.txt", "9-file/text-new2.txt", (error) => {
  console.error(error);
});

fs.promises
  .rename("9-file/text-new2.txt", "9-file/text.txt")
  .then(() => {
    console.log("DOne");
  })
  .catch(console.error);
