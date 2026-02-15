import { IDomainEvent } from '../../../../domain/events/domain-event.interface/domain-event.interface';

export abstract class EventPublisherPort {
  abstract publish(event: IDomainEvent): Promise<void>;
}
