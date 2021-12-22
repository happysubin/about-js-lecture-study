//Spy in unit testing

//spy 사용할 때
//체크 가능한 것. 함수가 호출 되었는가? 맞다면 몇번 호출 되었는가
//인자는 무엇인가. 함수가 무엇을 리턴하는가. 리턴한 것 확인
//즉 얼마나 호출, 어떤 인자와 사용되었는가!!!

const MyClass = require("../MyClass");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const nock = require("nock");

beforeEach(() => {
  myObj = new MyClass();
});

describe.skip("Test suit", () => {
  //스킵은 말 그대로 스킵
  let myObj;

  beforeEach(() => {
    myObj = new MyClass();
  });

  it("Test the add method", () => {
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  /**
   *
   * sinon Spy 공부 시작
   *
   */

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

  /**
   *
   * mock 공부 시작
   *
   */

  it("mock the sayHello back", () => {
    const mock = sinon.mock(myObj);
    const expectation = mock.expects("sayHello"); // 메소드 이름이 인자. 우리가 원하는 결과를 정의
    const expectation2 = mock.expects("add");
    expectation.exactly(1); //몇 번 호출되었는가
    expectation.withArgs("Hello world"); //이 인자가 들어감
    expectation2.exactly(1); //1번 호출되었다고 동일하게 나옴
    myObj.callAnotherFn(10, 20);
    mock.verify();
  });

  //모킹을 해서 sayHello의 콘솔로그 함수가 호출되지 않는다.
  //대신 호출은 검사는 스무스하게 흘러감
  //좀 더 구체적인 테스트를 할 때 mock를 사용. 그러나 내부 로직을 직접 다 수행하지는 않음. 흐름만 수행한다라고 이행
});

/**
 *
 * stub 공부 시작
 *
 */

describe.skip("Test suit for stub", () => {
  it("Stub the add method", () => {
    const stub = sinon.stub(myObj, "add");
    stub.withArgs(10, 20).returns(30); //이게 대신 수행해주나?

    //stub returns 값에 따라 아래 equal 값이 달라진다. 위 코드에 종속되는 듯

    expect(myObj.callAnotherFn(10, 20)).to.be.equal(30);
  });
});

//stub는 DB 네트워크 관련 코드에서 복잡한 일을 대체하는 코드로 사용
//즉 DB일을 stub가 대체하는 느낌!

//Testing promise

describe.skip("Test the promise", () => {
  it("Promise test case", () => {
    /*myObj.testPromise().then((result) => {
      expect(result).to.be.equal(6);
      expect(false).to.be.false;
      done();
    });*/
    return expect(myObj.testPromise()).to.eventually.equal(6);
  });
});

//chai-as-Promised 라는 라이브러리를 사용. 이걸로 편하게 Promise 테스트 가능!

/**
 *
 *  nock 를 이용한 ajax 테스트 코드
 *
 */

describe("XHR test suit", () => {
  it("Mock and stub xhr call", async () => {
    const scope = nock("https://echo-service-new.herokuapp.com") //도메인을 넣음
      .post("/echo")
      .reply(200, { id: 123 });
    //mock stub처럼 네트워크 관련 작업을 진짜하지는 않고 로직을 수행
    console.log(await myObj.xhrFn());
    expect(myObj.xhrFn()).to.eventually.equal({ id: 123 });
  });
});
