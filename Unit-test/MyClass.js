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
}

module.exports = MyClass;
