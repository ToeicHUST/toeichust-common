import { IBaseDomainEvent } from '../base-domain-event.interface/base-domain-event.interface';
import { EventTopics } from '../event-topics.constant/event-topics.constant';

export class TargetUpdatedEvent implements IBaseDomainEvent {
  topic = EventTopics.TARGET_UPDATED;
  data: {
    // version: number;
    targetId: string;
    userId: string;
    score: number | null;

    targetDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };

  constructor(
    targetId: string,
    userId: string,
    score: number | null,
    targetDate: Date | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.data = {
      // version: 1,
      targetId,
      userId,
      score,
      targetDate,
      createdAt,
      updatedAt,
    };
  }
}
