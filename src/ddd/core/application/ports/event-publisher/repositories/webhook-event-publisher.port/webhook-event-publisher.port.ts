import { IBaseDomainEvent } from '../../../../../domain/events/base-domain-event.interface/base-domain-event.interface';

export abstract class WebhookEventPublisherPort {
  abstract publish(event: IBaseDomainEvent): Promise<void>;
}
