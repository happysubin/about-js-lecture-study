class MyClass {
  constructor() {
    console.log("init");
  }

  add(arg1, arg2) {
    const result = arg1 + arg2;
    return result;
  }

  callAnotherFn(arg1, arg2) {
    const result = this.add(arg1, arg2);
    return result;
  }

  callTheCallback(callback) {
    callback();
  }
}

module.exports = MyClass;
