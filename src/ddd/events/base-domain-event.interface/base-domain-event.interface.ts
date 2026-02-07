import { EventTopics } from '../event-topics.constant/event-topics.constant';

export interface IBaseDomainEvent {
  topic: EventTopics;
  data: any;
}
