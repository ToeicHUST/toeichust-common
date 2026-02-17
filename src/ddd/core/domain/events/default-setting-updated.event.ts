import { EventTopics } from './constants/event-topics.constant';
import { IDomainEvent } from './domain-event.interface';

export class DefaultSettingUpdatedEvent implements IDomainEvent {
  topic = EventTopics.DEFAULT_SETTING_UPDATED;
  data: {
    id: string;

    key: string;

    value: string;

    type: string;

    description: string;

    createdAt: Date;
    updatedAt: Date;
  };

  constructor(
    id: string,

    key: string,

    value: string,

    type: string,

    description: string,

    createdAt: Date,
    updatedAt: Date,
  ) {
    this.data = {
      id,
      key,
      value,
      type,
      description,
      createdAt,
      updatedAt,
    };
  }
}
