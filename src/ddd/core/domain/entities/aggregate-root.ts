import { DomainEntity } from './domain.entity';

export abstract class AggregateRoot<T> extends DomainEntity<T> {
  constructor(id: T) {
    super(id);
  }
}
