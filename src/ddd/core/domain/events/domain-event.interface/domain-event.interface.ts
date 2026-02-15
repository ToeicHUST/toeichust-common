import { EventTopics } from '../event-topics.constant/event-topics.constant';

export interface IDomainEvent {
  topic: EventTopics;
  data: any;
}
