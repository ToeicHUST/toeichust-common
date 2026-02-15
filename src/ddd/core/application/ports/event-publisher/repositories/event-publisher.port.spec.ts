import { EventPublisherPort } from './event-publisher.port/event-publisher.port';

describe('PublisherEventPort', () => {
  it('should be an abstract class', () => {
    expect(typeof EventPublisherPort).toBe('function');
    expect(EventPublisherPort.prototype.publish).toBeUndefined();
  });

  it('should be implementable as a concrete class', () => {
    class MockPublisher extends EventPublisherPort {
      async publish(eventName: string, payload: Record<string, any>) {}
    }

    const publisher = new MockPublisher();
    expect(publisher).toBeInstanceOf(EventPublisherPort);
  });
});
