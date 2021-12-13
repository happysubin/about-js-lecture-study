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
    const sum = this.value + num;
    if (sum > 100) {
      throw new Error("100 이상 불가");
    }
    this.value = sum;
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
