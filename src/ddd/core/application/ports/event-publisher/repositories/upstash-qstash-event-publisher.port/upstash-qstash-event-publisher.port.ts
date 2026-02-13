import { IBaseDomainEvent } from '../../../../../domain/events/base-domain-event.interface/base-domain-event.interface';

export abstract class UpstashQstashEventPublisherPort {
  abstract publish(event: IBaseDomainEvent): Promise<void>;
}
