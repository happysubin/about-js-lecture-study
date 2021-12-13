const chai = require("chai");

const Calculator = require("../calculator");

const assert = chai.assert;
const should = chai.should(); //함수가 실행
const expect = chai.expect; //함수에 대한 참조

describe("Calculator code test", function () {
  let calc;

  beforeEach(function () {
    calc = new Calculator(); //테스트는 독립져야하므로 테스트 진행 전 새로운 객체가 생성
    //각각의 테스트는 서로에게 영향을 주면 안된다.
  });

  afterEach(function () {
    calc.value = 0;
  });

  it("init", function (done) {
    assert.equal(calc.value, 0);
    done();
  });

  it("set", function (done) {
    calc.set(9);
    assert.equal(calc.value, 9);
    done();
  });

  it("clear", function (done) {
    calc.clear();
    assert.equal(calc.value, 0);
    done();
  });

  it("add", function (done) {
    calc.set(6);
    calc.add(9);
    assert.equal(calc.value, 15);
    done();
  });

  it("subtract", function (done) {
    calc.set(22);
    calc.subtract(9);
    assert.equal(calc.value, 13);
    done();
  });

  it("multiply", function (done) {
    calc.set(22);
    calc.multiply(4);
    assert.equal(calc.value, 88);
    done();
  });

  describe("divide", function () {
    it("normal case", function (done) {
      calc.set(22);
      calc.divide(2);
      assert.equal(calc.value, 11);
      done();
    });

    it("0/0 == NAN", function (done) {
      calc.set(0);
      calc.divide(0);
      assert.isNaN(calc.value);
      done();
    });

    it("1/0 == Infinity", function (done) {
      calc.set(1);
      calc.divide(0);
      assert.equal(calc.value, Infinity);
      done();
    });
  });
});
