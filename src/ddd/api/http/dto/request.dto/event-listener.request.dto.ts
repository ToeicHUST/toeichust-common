import { EventTopics } from '../../../../core/domain/events/constants/event-topics.constant';
import { IDomainEvent } from '../../../../core/domain/events/domain-event.interface';

export class EventDataListenerRequestDto implements IDomainEvent {
  topic: EventTopics;
  data: any;
}

export class EventListenerRequestDto {
  event: EventDataListenerRequestDto;
}
