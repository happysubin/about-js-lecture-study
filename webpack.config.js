const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/client/js/main.js", //우리가 코드를 작성하는 곳이다.
  mode: "development", //개발중이라는 뜻이다.
  watch: true, //nodemon과 비슷하게 계속 지켜본다
  output: {
    //output파일들과 폴더들은 자동으로 생성된다.
    path: path.resolve(__dirname, "assets"), //절대경로로 생성된다.
    filename: "js/main.js", //결과물이 저장될 파일이다.
    clean: true, //매번 리셋 하고 시작
  },
  module: {
    rules: [
      //모듈에 룰이 있다고 생각!
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        //sass-loader 부터 실행.
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: "css/main.css" })],
};
//output는 절대경로여야한다.
