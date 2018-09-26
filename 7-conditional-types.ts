export interface Boxed<T> {
  __boxed: '';
  value: T;
}





































export interface UnboxedArray<T> extends Array<T> {
  [idx: number]: Unboxed<T>;
}

export type UnboxedObject<T> = {
  [prop in keyof T]: Unboxed<T[prop]>;
};

export type Unboxed<T> =
  // (ab)use 'symbol' to catch 'any' typing
  T extends Boxed<symbol[]> ? any
  : T extends Boxed<symbol> ? any
  : T extends Boxed<string> ? string
  : T extends Boxed<number> ? number
  : T extends Boxed<boolean> ? boolean
  : T extends Boxed<(infer U)[]> ? U extends Boxed<any> ? UnboxedArray<U> : U[]
  : T extends Boxed<infer U> ? U extends Boxed<any> ? UnboxedObject<U> : U
  : T extends symbol[] ? any
  : T extends symbol ? any
  : T extends string ? string
  : T extends number ? number
  : T extends boolean ? boolean
  : T extends (infer U)[] ? U extends Boxed<any> ? UnboxedArray<U> : U[]
  : UnboxedObject<T>;

export type BoxedString = Boxed<string>;
export type UnboxedString = Unboxed<string>;
export type UnboxedBoxedString = Unboxed<BoxedString>;

export type BoxedNumberArray = Boxed<number[]>;
export type UnboxedNumberArray = Unboxed<number[]>;
export type UnboxedBoxedNumberArray = Unboxed<BoxedNumberArray>;

export type BoxedBoxedBooleanArray = Boxed<Boxed<boolean>[]>;
export type UnboxedBoxedBoxedBooleanArray = Unboxed<BoxedBoxedBooleanArray>;

export let arr: UnboxedBoxedBoxedBooleanArray;
export type T = typeof arr[number];

























export function isBoxed<T = any>(value: any): value is Boxed<T> {
  return !!value && (value as Boxed<any>).__boxed === '';
}

export function box<T>(value: T): Boxed<T> {
  return {
    __boxed: '',
    value,
  };
}

export function unbox<T>(value: T): Unboxed<T> {
  if (['string', 'boolean', 'number', 'undefined'].indexOf(typeof value) >= 0 || value === null) {
    return value as Unboxed<T>;
  }

  if (isBoxed<T>(value)) {
    return value.value as Unboxed<T>;
  }

  if (Array.isArray(value)) {
    return value.map(unbox) as Unboxed<T>;
  }

  return Object.keys(value).reduce((a, k) => Object.assign(a, { [k]: unbox(value[k as keyof T]) }), {} as Unboxed<T>);
}


