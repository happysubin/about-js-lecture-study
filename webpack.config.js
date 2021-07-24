const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", // 소스코드들을 모아둔 폴더를 엔트리라고 칭한다!
  mode: "development", //모드가 개발중이다! 즉 아직 개발중이다 를 의미 (default 값은 production mode이다  완성되었으면 production mode를 사용)
  output: {
    //webpack 은 절대경로를 요구한다!!!!!!
    filename: "js/main.js", //path 안에 저장된 파일. 결과물을 위한 파일이름을 쓰고
    path: path.resolve(__dirname, "assets"), //파일을 어디에 저장할지 작성하는 부분! assets dir 안에 js dir 을 의미
    //1. path 를 작성할 당시 assets 라는 폴더가 없다
    //2. npm run assets 를 통해 assets js 폴더도 생기고 main.js 라는 파일도 자동으로 생겼다.
    clean: true, //이걸로 시작할때마다 다 지우고 assets를 만들고 main.js 랑 main.css 도 다시 작성한다
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
  ], //플러그인을 사용
  module: {
    rules: [
      {
        test: /\.js$/, // 정규표현식 .는 모든것을 아우른다. 그래서 \.js === '.js'와 같다. 이건 확장자 .js와 같은 의미! 그런고로 js를 변형한다! babel-loader을 통해서
        //모든 js를 가져와서 몇가지 변환을 시킨다! 그러기위해서 babel-loader을 사용!
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //style-loader을 대체!!!! main.css 파일이 생성된다
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //이건 js에서 css를 적용하는게 아니라 css를 모은 파일을 생성한다
        //use: ["style-loader", "css-loader", "sass-loader"], //실행되는 역순으로 코드를 작성한다. 이유는 webpack은 뒤에서부터 시작하기 때문
        //실상은 sass-loader 부터 실행된다  , 이 코드를 통해 js 파일안에서 scss가 css로 바뀌고 css가 적용된다
      },
    ],
  },
};

//path resolve 는 join 과 다르게 절대 경로로 인식하며 오른쪽부터 왼쪽으로 읽는다. /폴더명을 만나면 절대경로로 인식!!!
//웹팩은 바닐라 자바스크립트로 작성해야한다!
