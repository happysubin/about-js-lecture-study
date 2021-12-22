const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class MyClass {
  constructor() {
    //console.log("init");
  }

  sayHello(str) {
    console.log(str);
  }

  add(arg1, arg2) {
    const result = arg1 + arg2;
    console.log(result);
    return result;
  }

  callAnotherFn(arg1, arg2) {
    this.sayHello("Hello world");
    const result = this.add(arg1, arg2);
    return result;
  }

  callTheCallback(callback) {
    callback();
  }

  testPromise() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(3), 1500);
    }).then((result) => result * 2);
  }

  xhrFn() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("post", "https://echo-service-new.herokuapp.com/echo", true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    })
      .then(function (result) {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}

module.exports = MyClass;
