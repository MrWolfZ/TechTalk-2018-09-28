let inferred = {
  a: 1,
  b: 'foo',
};

















function isGreaterThan10(input: number): boolean {
  return input > 10;
}



















function parseAsNumberIfPossible(input: string) {
  const n = parseInt(input);
  return isNaN(n) ? input : n;
}




















function getYear(input: Date | string) {
  if (typeof input === 'string') {
    input = new Date(input);
  }

  return input.getFullYear();
}





















class Person {
  name: string;
}

type Name = Person['name'];

let person: Person;

type Name2 = typeof person.name;

function propertyName<T>(name: keyof T) {
  return name;
}

propertyName<Person>('name');























function getProperty<T, K extends keyof T>(o: T, name: K) {
  return o[name];
}

interface Book {
  title: string;
  releaseYear: number;
}

let book: Book = {
  title: 'Lord of the Flies',
  releaseYear: 1954,
};

let bookTitle = getProperty(book, 'title');
let bookReleaseYear = getProperty(book, 'releaseYear');


























function keys<T>(t: T): (keyof T)[] {
  return Object.keys(t) as any;
}

const bookKeys = keys(book);
