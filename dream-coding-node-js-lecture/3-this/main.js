function hello() {
  console.log("hello");
  console.log(this); //this 가 global이다
  console.log(this == global); //ture 라고 값이 나온다
}
hello();

class a {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log("--------class----------------");
    console.log(this); //클래스 자체가 나온다
    console.log(this == global); //false 가 나온다 global이 아닌 클래스 자기 자신이다
  }
}
const A = new a(1);

A.memberFunction();

console.log("------------global-------------");
console.log(this); //텅 빈걸로 나온다
console.log(this === module.exports); //true 라고 출력된다.
