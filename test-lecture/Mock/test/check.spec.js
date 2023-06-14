const check = require("../check");
const chai = require("chai");

const assert = chai.assert;
const expect = chai.expect;

const sinon = require("sinon");

beforeEach(() => {
  onSuccess = sinon.spy();
  onFail = sinon.spy();
});

describe("test mocking!", () => {
  it("try to mocking", () => {
    check(() => true, onSuccess, onFail);
    //check(() => true, onSuccess, onFail);

    sinon.assert.notCalled(onFail); //호출안되었는지 확인
    sinon.assert.callCount(onSuccess, 1);
    sinon.assert.calledOnce(onSuccess); //호출되었는지 확인
  });
});
