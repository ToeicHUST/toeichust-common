import { BaseDomainEventInterface } from './base-domain-event.interface';

describe('BaseDomainEventInterface', () => {
  it('should be defined', () => {
    expect(new BaseDomainEventInterface()).toBeDefined();
  });
});
