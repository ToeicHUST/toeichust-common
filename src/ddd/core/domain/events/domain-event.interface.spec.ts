import { DomainEventInterface } from './domain-event.interface';

describe('DomainEventInterface', () => {
  it('should be defined', () => {
    expect(new DomainEventInterface()).toBeDefined();
  });
});
