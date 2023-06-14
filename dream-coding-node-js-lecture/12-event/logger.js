const eventEmmiter = require("events");

class logger extends eventEmmiter {
  log(callback) {
    this.emit("log", "started...");
    callback();
    this.emit("log", "finished...");
  }
}

module.exports.logger = logger;
