export type Incomplete<T> = {
  [p in keyof T]?: T[p];
};

export type DeepIncomplete<T> =
  T extends (infer U)[] ? DeepIncompleteArray<U> :
  T extends object ? IncompleteObject<T> :
  T;

export interface DeepIncompleteArray<T> extends Array<DeepIncomplete<T>> { }

export type IncompleteObject<T> = {
  [p in keyof T]?: DeepIncomplete<T[p]>;
};

export function withDefaults<T>(defaults: T) {
  return (input: DeepIncomplete<T>): T => {
    if (Array.isArray(defaults)) {
      return withDefaultsArray(defaults)(input as any as DeepIncompleteArray<T>) as any as T;
    }

    if (typeof defaults === 'object') {
      return withDefaultsObject<any>(defaults)(input as IncompleteObject<T>);
    }

    return (input as T) || defaults;
  };
}

export function withDefaultsObject<T extends object>(defaults: T) {
  return (input: IncompleteObject<T>): T => {
    return Object.keys(defaults).map(k => k as keyof T).reduce((agg, k) => {
      const defaultValue = defaults[k];
      const inputValue = input[k];
      agg[k] = inputValue ? withDefaults(defaultValue)(inputValue as DeepIncomplete<T[keyof T]>) : defaultValue;
      return agg;
    }, {} as T);
  };
}

export function withDefaultsArray<T>(defaults: T[]) {
  return (input: DeepIncompleteArray<T>): T[] => {
    // note that there is missing handling for the case of the defaults array being shorter than the input
    const result = defaults.slice(0);
    result.splice(0, input.length, ...input.map((i, idx) => withDefaults(defaults[idx])(i)));
    return result;
  };
}
