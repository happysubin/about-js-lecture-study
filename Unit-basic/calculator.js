class Calculator {
  constructor() {
    this.value = 0;
  }
  set(num) {
    this.value = num;
  }
  clear(num) {
    this.value = 0;
  }
  add(num) {
    this.value += num;
  }
  subtract(num) {
    this.value -= num;
  }
  multiply(num) {
    this.value *= num;
  }
  divide(num) {
    this.value /= num;
  }
}

module.exports = Calculator;
