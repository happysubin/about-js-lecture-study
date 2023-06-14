function check(predicate, onSuccess, onFail) {
  //3가지 다 콜백함수
  if (predicate()) {
    onSuccess("yes");
  } else {
    onFail("no");
  }
}

module.exports = check;
