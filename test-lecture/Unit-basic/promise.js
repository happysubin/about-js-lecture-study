function fetchProduct(error) {
  if (error === "error") {
    return Promise.reject("networkError");
  }
  return Promise.resolve({ item: "Coke", price: 1000 });
}

module.exports = fetchProduct;
