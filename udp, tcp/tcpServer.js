const net = require("net"); //tcp 소켓 통신에서 사용되는 모듈이다.

const PORT = 15000;
const HOST = "localhost";

const tcpServer = net.createServer(function (socket) {
  socket.on("data", function (data) {
    console.log("클라이언트로부터 데이터 수신");
    console.log(data);
    const returnMsg = data.toString().toUpperCase();
    console.log(returnMsg);
    socket.write(returnMsg);
  });

  socket.on("end", function () {
    console.log("접속 종료");
    tcpServer.close();
  });
});

tcpServer.on("listening", function () {
  console.log(`Server is listening port on ${PORT}!!`);
});

tcpServer.on("close", function () {
  console.log("server is closed");
});

tcpServer.on("error", function (err) {
  console.log("on error: ", err.code);
});

tcpServer.listen(PORT, HOST, function () {
  console.log();
});
