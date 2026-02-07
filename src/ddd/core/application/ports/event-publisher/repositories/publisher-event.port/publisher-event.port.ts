import { IBaseDomainEvent } from '../../../../../../events/base-domain-event.interface/base-domain-event.interface';

export abstract class PublisherEventPort {
  abstract publish(event: IBaseDomainEvent): Promise<void>;
}
