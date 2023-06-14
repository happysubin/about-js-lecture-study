const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const PORT = 13000;
const HOST = "localhost";
const clientPort = 8080;

server.on("listening", function () {
  console.log("UDP server on!!!");
  console.log(server.address());
});

server.on("message", function (message, remote) {
  const returnMsg = message.toString().toUpperCase();
  console.log(returnMsg);

  server.send(
    returnMsg,
    0,
    returnMsg.length,
    clientPort,
    HOST,
    function (err, bytes) {
      if (err) console.log(err);
      console.log(`send to message host${HOST} port ${clientPort}`);
    }
  );

  setTimeout(function () {
    server.close();
  }, 2000);
});

server.bind(PORT, HOST);
