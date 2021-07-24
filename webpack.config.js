const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", // 소스코드들을 모아둔 폴더를 엔트리라고 칭한다!
  output: {
    //webpack 은 절대경로를 요구한다!!!!!!
    filename: "main.js", //path 안에 저장된 파일. 결과물을 위한 파일이름을 쓰고
    path: path.resolve(__dirname, "assets", "js"), //파일을 어디에 저장할지 작성하는 부분! assets dir 안에 js dir 을 의미
    //1. path 를 작성할 당시 assets 라는 폴더가 없다
    //2. npm run assets 를 통해 assets js 폴더도 생기고 main.js 라는 파일도 자동으로 생겼다.
  },
};

//path resolve 는 join 과 다르게 절대 경로로 인식하며 오른쪽부터 왼쪽으로 읽는다. /폴더명을 만나면 절대경로로 인식!!!
