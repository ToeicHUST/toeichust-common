import { IDomainEvent } from '../domain-event.interface/domain-event.interface';
import { EventTopics } from '../event-topics.constant/event-topics.constant';

export class TargetUpdatedEvent implements IDomainEvent {
  topic = EventTopics.TARGET_UPDATED;
  data: {
    // version: number;
    targetId: string;
    learnerId: string;
    score: number | null;

    targetDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };

  constructor(
    targetId: string,
    learnerId: string,
    score: number | null,
    targetDate: Date | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.data = {
      // version: 1,
      targetId,
      learnerId,
      score,
      targetDate,
      createdAt,
      updatedAt,
    };
  }
}
