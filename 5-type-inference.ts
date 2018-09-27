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

















function adjust(input: number | string) {
  return input;
}

const res1 = adjust('foo');
const res2 = adjust(42);


















function adjust2<T extends number | string>(input: T) {
  return input;
}

const res3 = adjust2('foo');
const res4 = adjust2(42);




























function adjust3(input: number): number;
function adjust3(input: string): string;
function adjust3(input: number | string) {
  return input;
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
