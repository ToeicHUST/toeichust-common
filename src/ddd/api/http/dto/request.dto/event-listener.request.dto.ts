import { IDomainEvent } from '../../../../core/domain/events/domain-event.interface/domain-event.interface';
import { EventTopics } from '../../../../core/domain/events/event-topics.constant/event-topics.constant';

export class EventDataListenerRequestDto implements IDomainEvent {
  topic: EventTopics;
  data: any;
}

export class EventListenerRequestDto {
  event: EventDataListenerRequestDto;
}
