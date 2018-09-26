abstract class DomainEvent<TKind extends string = string> {
  constructor(kind: TKind, eventVersion = 1) {
    this.kind = kind;
    this.eventVersion = eventVersion;
    this.occurredOnEpoch = Date.now();
  }

  kind: TKind;
  occurredOnEpoch: number;
  eventVersion: number;
}

export class BookWasPublished extends DomainEvent<typeof BookWasPublished.KIND> {
  constructor(
    public title: string,
  ) {
    super(BookWasPublished.KIND);
  }

  static readonly KIND = 'BOOK_WAS_PUBLISHED';
}

export class BookSoldOut extends DomainEvent<typeof BookSoldOut.KIND> {
  constructor(
    public title: string,
  ) {
    super(BookSoldOut.KIND);
  }

  static readonly KIND = 'BOOK_SOLD_OUT';
}

export type DomainEvents =
  | BookWasPublished
  | BookSoldOut
  ;

export const bookWasPublished = new BookWasPublished('LOTR');
























export function filterEvents<TEvent extends DomainEvent>(...kinds: string[]) {
  return (events: DomainEvent[]) => {
    return events.filter(e => kinds.indexOf(e.kind as any) >= 0) as TEvent[];
  }
}

filterEvents<DomainEvents>(
  BookWasPublished.KIND,
  'foo',
);
































type EntityEventHandler<TEvent extends DomainEvent = DomainEvent> = (event: TEvent) => void;

type EventHandlerMap<TEvent extends DomainEvent> = {
  [eventKind in TEvent['kind']]: EntityEventHandler<TEvent>;
};

export function subscribe<TEvent extends DomainEvent<TEvent['kind']>>(eventHandlers: EventHandlerMap<TEvent>) {
  return (event: TEvent) => {
    eventHandlers[event.kind](event);
  };
}

subscribe<DomainEvents>({
  [BookWasPublished.KIND]: event => {
    const castedEvent = event as BookWasPublished;
    console.log(castedEvent);
  },
  [BookSoldOut.KIND]: event => {
    const castedEvent = event as BookSoldOut;
    console.log(castedEvent);
  },
});
