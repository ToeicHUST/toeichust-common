import { EventTopics } from './constants/event-topics.constant';
import { IDomainEvent } from './domain-event.interface';

export class UserSettingUpdatedEvent implements IDomainEvent {
  topic = EventTopics.USER_SETTING_UPDATED;
  data: {
    id: string;

    key: string;

    value: string;

    createdAt: Date;
    updatedAt: Date;

    userId: string;
  };

  constructor(
    id: string,
    key: string,
    value: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
  ) {
    this.data = {
      id,
      key,
      value,
      createdAt,
      updatedAt,
      userId,
    };
  }
}
