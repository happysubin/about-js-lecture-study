const helloWorld = (
  name: string,
  age: number,
  married: boolean,
  gender: string
): string => `${name}, ${age}, ${married}, ${gender}`; //반환 값을 알려준다

console.log(helloWorld("k", 24, false, "ho"));
