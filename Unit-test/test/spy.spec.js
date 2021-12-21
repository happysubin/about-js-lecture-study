//Spy in unit testing

//spy 사용할 때
//체크 가능한 것. 함수가 호출 되었는가? 맞다면 몇번 호출 되었는가
//인자는 무엇인가. 함수가 무엇을 리턴하는가. 리턴한 것 확인
//즉 얼마나 호출, 어떤 인자와 사용되었는가!!!

const MyClass = require("../MyClass");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

beforeEach(() => {
  myObj = new MyClass();
});

describe("Test suit", () => {
  let myObj;

  beforeEach(() => {
    myObj = new MyClass();
  });

  it("Test the add method", () => {
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  it("Spy the add method", () => {
    const spy = sinon.spy(myObj, "add");
    const arg1 = 10,
      arg2 = 20;
    //myObj 안에 메소드 add 메소드를 wrapper 한다.
    //기존 메소드에 영향을 끼치지 않고 추적만 한다. 몇번 사용한 지 확인가능
    myObj.callAnotherFn(arg1, arg2);
    //sinon.assert.calledTwic(spy); //2번 불렸다.
    sinon.assert.calledOnce(spy); //callAnotehrFn 안에서 1번 불렸다
    expect(spy.calledOnce).to.be.true; //1번 불리니 true
    expect(spy.calledWith(arg1, arg2)).to.be.true; //어떤 인자와 함께 불렸는지 체크
  });

  it("spy the call back", () => {
    const callback = sinon.spy(); //spy로 만들어버림. Dummy Callback
    myObj.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true; //한번 호출 되었다.
  });
});
