// TODO: basic conditional types example




























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
    customProps: Pick<T, Exclude<keyof T, keyof DomainEvent<T['kind']>>>,
    ): T => {
      const instance = new cons();
      instance.kind = cons.KIND;
      instance.occurredOnEpoch = Date.now();
      instance.eventVersion = eventVersion;
      Object.assign(instance, customProps);
      return instance;
    }
}

export class ServiceRequestReceived extends DomainEvent<typeof ServiceRequestReceived.KIND> {
  invocationId: string;
  path: string;
  body: string;

  static readonly KIND = 'service-invocation/ServiceRequestReceived';
  static readonly create = DomainEvent.createBase(ServiceRequestReceived);
}





















type EntityEventHandler<TEvent extends DomainEvent<TEvent['kind']> = DomainEvent> = (event: TEvent) => void;

type EventOfKind<TEvent, TKind extends string> = TEvent extends DomainEvent<TKind> ? TEvent : never;

type EventHandlerMap<TEvent extends DomainEvent> = {
  [eventKind in TEvent['kind']]: EntityEventHandler<EventOfKind<TEvent, eventKind>>;
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