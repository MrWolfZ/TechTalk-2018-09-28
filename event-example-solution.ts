interface EventConstructor<T extends DomainEvent<T['kind']>> {
  new(...args: any[]): T;
  readonly KIND: T['kind'];
}

abstract class DomainEvent<TKind extends string = string> {
  kind: TKind;
  occurredOnEpoch: number;
  eventVersion: number;

  static readonly createBase = <T extends DomainEvent<T['kind']>>(
    cons: EventConstructor<T>,
    eventVersion = 1,
  ) => (
    customProps: Pick<T, Exclude<keyof T, keyof DomainEvent>>,
    ): T => {
      const instance = new cons();
      instance.kind = cons.KIND;
      instance.occurredOnEpoch = Date.now();
      instance.eventVersion = eventVersion;
      Object.assign(instance, customProps);
      return instance;
    }
}

export class BookWasPublished extends DomainEvent<typeof BookWasPublished.KIND> {
  title: string;

  static readonly KIND = 'BOOK_WAS_PUBLISHED';
  static readonly create = DomainEvent.createBase(BookWasPublished);
}

export class BookSoldOut extends DomainEvent<typeof BookSoldOut.KIND> {
  title: string;

  static readonly KIND = 'BOOK_SOLD_OUT';
  static readonly create = DomainEvent.createBase(BookSoldOut);
}

export type DomainEvents =
  | BookWasPublished
  | BookSoldOut
  ;

export const bookWasPublished = BookWasPublished.create({
  title: 'LOTR',
});


































export function filterEvents<TEvent extends DomainEvent<TEvent['kind']>>(...kinds: TEvent['kind'][]) {
  return (events: DomainEvent[]) => {
    return events.filter(e => kinds.indexOf(e.kind as any) >= 0) as TEvent[];
  }
}

filterEvents<DomainEvents>(
  BookWasPublished.KIND,
  'foo',
);




































const eventKinds = [
  BookWasPublished.KIND as typeof BookWasPublished.KIND,
];

function f(_: never) { }
const p: Exclude<DomainEvents['kind'], typeof eventKinds[number]> = undefined!;

f(p);

function f2<TEvent extends DomainEvent<TEvent['kind']>>() {
  return <T1 extends TEvent['kind']= never, T2 extends TEvent['kind']= never>(t1?: T1, t2?: T2): Exclude<TEvent['kind'], T1 | T2> => {
    return undefined!;
  };
}

f(f2<DomainEvents>()(BookWasPublished.KIND));


































type EntityEventHandler<TEvent extends DomainEvent = DomainEvent> = (event: TEvent) => void;

type EventOfKind<TEvent, TKind extends string> = TEvent extends DomainEvent<TKind> ? TEvent : never;

type EventHandlerMap<TEvent extends DomainEvent> = {
  [eventKind in TEvent['kind']]: EntityEventHandler<EventOfKind<TEvent, eventKind>>;
};

export function subscribe<TEvent extends DomainEvent<TEvent['kind']>>(eventHandlers: EventHandlerMap<TEvent>) {
  return (event: TEvent) => {
    eventHandlers[event.kind](event as EventOfKind<TEvent, typeof event.kind>);
  };
}

subscribe<DomainEvents>({
  [BookWasPublished.KIND]: event => {
    console.log(event);
  },
  [BookSoldOut.KIND]: event => {
    console.log(event);
  },
});
