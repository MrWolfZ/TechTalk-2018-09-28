type StringOrNumber = string | number;

let stringOrNumber = 'foo';



























interface Person {
  name: string;
  age: number;
  occupation: string;
}

interface Pet {
  name: string;
  age: 'young' | 'old';
  kind: string;
}

let person = {
  name: 'Max',
  age: 20,
  occupation: 'student',
};

let pet = {
  name: 'Tiger',
  age: 'old',
  kind: 'cat',
}

let personOrPet: Person | Pet = person;
personOrPet = pet;

let personOrPetName = personOrPet.name;
let personOrPetAge = personOrPet.age;
let personOccupation = personOrPet.occupation;
personOccupation = (personOrPet as Person).occupation;






















interface Named {
  name: string;
}

interface Aged {
  age: number;
}

let namedAndAged: Named & Aged = { name: 'Max', age: 20 };




















// http://www.typescriptlang.org/docs/handbook/advanced-types.html
