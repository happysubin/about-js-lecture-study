const readline = require("readline");
const dgram = require("dgram");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = dgram.createSocket("udp4");

const PORT = 13000;
const HOST = "127.0.0.1";

rl.on("line", function (line) {
  const message = line;
  client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
    if (err) console.log(err);
    console.log(`send to message host${HOST} port ${PORT}`);
  });
}).on("close", function () {
  process.exit();
}); //한줄 받으면 입력이 끝

client.on("message", function (message, remote) {
  console.log(message.toString());
  rl.close();
  client.close();
});

const clientPORT = 8080;

client.bind(clientPORT, HOST);
