const logger = require("./logger");
const emitter = new logger.logger();

emitter.on("log", (event) => {
  console.log(event);
});

emitter.log(() => {
  console.log("hello ~~~~!~!~!~!~ doint something");
});
