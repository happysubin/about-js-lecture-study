class Human {
  public name: string;
  public age: number;
  public married: boolean;
  public gender: string;
  constructor(name: string, age: number, married: boolean, gender: string) {
    this.name = name;
    this.age = age;
    this.married = married;
    this.gender = gender;
  }
}

const bin = new Human("bin", 24, false, "male");

const helloWorld = (person: Human): string =>
  `${person.name}, ${person.age}, ${person.married}, ${person.gender} !!`; //반환 값을 알려준다

console.log(helloWorld(bin));
