const assert = require("assert");

const add = require("../add");

// 테스트 이름이 첫 매개변수, 이후 콜백함수에서 테스트 코드 작성
// 사실 진짜 테스트는 it 단위에서 이루어짐
describe("처음 테스트", function () {
  it("처음 단위 테스트", function (done) {
    assert.equal(add(1, 2), 3);
    done();
  });
});
