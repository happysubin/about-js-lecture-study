interface human {
  name: string;
  age: number;
  married: boolean;
  gender: string;
}

const person = {
  name: "k",
  age: 24,
  married: false,
  gender: "male",
};

const helloWorld = (person: human): string =>
  `${person.name}, ${person.age}, ${person.married}, ${person.gender} !!`; //반환 값을 알려준다

console.log(helloWorld(person));
