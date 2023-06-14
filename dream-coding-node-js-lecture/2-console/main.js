console.log("콘솔로그만 존재하지 않는다!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.clear();

console.log("log"); //개발
console.info("info"); //개발 용은 아니지만 중요한 정보를 남길 때 사용
console.warn("warn"); //발생하면 안되지만 치명적이지 않으면 경보단계로 사용
console.error("error"); //정말 심각한 에러가 발생하면 이것을 사용 (에러, 사용자, 시스템)

//assert
console.assert(2 === 3, "not same!");
console.assert(2 === 2, "same!!");

const student = { name: "subin", age: 23, company: { name: "College" } };

console.table(student);
console.dir(student, { showHidden: true, colors: false, depth: 0 });

//시간 측정
console.time("for loop");
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd("for loop");

const a = () => {
  console.count("a function");
};
a();
console.countReset("Reset");
a();

//trace

function f1() {
  f2();
}

function f2() {
  f3();
}
function f3() {
  console.log("f3");
  console.trace();
}

f1();
