import { EventTopics } from './constants/event-topics.constant';
import { IDomainEvent } from './domain-event.interface';

export class TargetUpdatedEvent implements IDomainEvent {
  topic = EventTopics.TARGET_UPDATED;
  data: {
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
      targetId,
      learnerId,
      score,
      targetDate,
      createdAt,
      updatedAt,
    };
  }
}
