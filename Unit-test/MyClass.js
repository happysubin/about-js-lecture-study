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
}

module.exports = MyClass;
