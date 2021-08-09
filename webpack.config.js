const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", //우리가 코드를 작성하는 곳이다.
  mode: "development", //개발중이라는 뜻이다.
  output: {
    //output파일들과 폴더들은 자동으로 생성된다.
    path: path.resolve(__dirname, "assets", "js"), //절대경로로 생성된다.
    filename: "main.js", //결과물이 저장될 파일이다.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
//output는 절대경로여야한다.
