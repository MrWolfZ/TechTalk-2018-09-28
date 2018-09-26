export type Partial<T> = {
  [prop in keyof T]?: T[prop];
};




























interface DatatableSearchConfigEntry<T> {
  defaultValue: T;
  debounce?: number;
  allowedValues?: T[];
}

type DatatableSearchConfig<TSearchValue> = {
  [prop in keyof TSearchValue]: DatatableSearchConfigEntry<TSearchValue[prop]>;
};

interface Search {
  name: string;
  age: number;
}

export const config: DatatableSearchConfig<Search> = {
  name: {
    defaultValue: '',
  },
  age: {
    defaultValue: 18,
  },
};

















// http://www.typescriptlang.org/docs/handbook/advanced-types.html
