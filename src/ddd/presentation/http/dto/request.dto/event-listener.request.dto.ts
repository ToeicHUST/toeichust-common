import { IBaseDomainEvent } from '../../../../core/domain/events/base-domain-event.interface/base-domain-event.interface';
import { EventTopics } from '../../../../core/domain/events/event-topics.constant/event-topics.constant';

export class EventDataListenerRequestDto implements IBaseDomainEvent {
  topic: EventTopics;
  data: any;
}

export class EventListenerRequestDto {
  event: EventDataListenerRequestDto;
}
