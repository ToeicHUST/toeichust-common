import { EventTopics } from './constants/event-topics.constant';

export interface IDomainEvent {
  topic: EventTopics;
  data: any;
}
