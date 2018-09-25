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

























interface DomainEvent<TKind extends string = string> {
  kind: TKind;
  occurredOnEpoch: number;
  eventVersion: number;
}

type EntityEventHandler<TEvent extends DomainEvent<TEvent['kind']> = DomainEvent> = (event: TEvent) => void;

type EventHandlerMap<TEvent extends DomainEvent> = {
  [eventKind in TEvent['kind']]: EntityEventHandler<TEvent>;
};

























interface BookWasPublished extends DomainEvent<'BOOK_PUBLISHED'> {
  title: string;
}

interface BookSoldOut extends DomainEvent<'BOOK_SOLD_OUT'> {
  title: string;
}

type DomainEvents = BookWasPublished | BookSoldOut;

export const EVENT_HANDLERS: EventHandlerMap<DomainEvents> = {
  BOOK_PUBLISHED: event => {
    console.log(event);
  },
  BOOK_SOLD_OUT: event => {
    console.log(event);
  },
};





// http://www.typescriptlang.org/docs/handbook/advanced-types.html
