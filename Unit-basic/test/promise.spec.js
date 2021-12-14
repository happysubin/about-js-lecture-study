const chai = require("chai");
const assertion = require("assert");

const fetchProduct = require("../promise");

const assert = chai.assert;
const expect = chai.expect;

describe("async test", function () {
  it("promise resolve test", function (done) {
    fetchProduct("error1").then((item) => {
      assert.deepEqual(item, { item: "Coke", price: 1000 });
      done();
    });
  });

  it("pormise reject test", async function (done) {
    setTimeout(async () => {
      const value = await fetchProduct("error"); //만약 error 가 아니면 이후 3초 뒤에 콘솔창에 에러가 발생한다.
      assertion.rejects(value);
      done();
    }, 3000);
    done();
  });
});
