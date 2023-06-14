const net = require("net");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new net.Socket();

socket.connect({ host: "localhost", port: 15000 }, function () {
  console.log("connect with server");
});

socket.setEncoding("utf8");

rl.on("line", function (line) {
  socket.write(Buffer.from(line));
}).on("close", function () {
  process.exit();
});

socket.on("data", function (data) {
  console.log(data.toString());
  socket.destroy(); //연결 끝
  socket.end();
});
