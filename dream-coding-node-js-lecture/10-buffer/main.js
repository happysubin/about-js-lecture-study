const fs = require("fs");
const buf = Buffer.from("Hi"); //버퍼는 배열로 되어있다
console.log(buf); //유니코드 형태로 출력된다.
console.log(buf.length);
console.log(buf[0]);
console.log(buf[1]);
console.log(buf.toString());
console.log(buf.toJSON());

//create
const buf2 = Buffer.alloc(2); //사이즈가 2인 버퍼를 만든다, 초기화도 시켜줌
const buf3 = Buffer.allocUnsafe(2); //이건 초기화 시키지 않는다.
buf2[0] = 73;
buf2[1] = 100;
buf2.copy(buf3);
console.log(buf2.toString());
console.log(buf3.toString());

//concat 여러 버퍼를 모아버린다
const newBuffer = Buffer.concat([buf, buf2, buf3]);
console.log(newBuffer.toString());
