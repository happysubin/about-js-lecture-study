const chai = require("chai");
const assertion = require("assert");

const ProductService = require("../product_service_no_di");
const StubProductClient = require("./stub_product_client");

describe("모킹 테스트 예제", () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it("상품 서비스 예제", async () => {
    const item = await productService.fetchAvailableItems();
    assertion.deepEqual(item, [{ item: "🥛", available: true }]);
  });
});

//sinon 을 이용해 mock를 사용하는 거 실패..너무 방법을 찾기 어렵다.
//고로 강의에서 stub 내용을 코드로 작성
//stub는 기존의 인터페이스를 사용하는 진짜와 대체 가능한 코드

//테스트 클라이언트를 주입
