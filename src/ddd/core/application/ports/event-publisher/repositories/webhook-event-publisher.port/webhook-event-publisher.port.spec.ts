import { WebhookEventPublisherPort } from './webhook-event-publisher.port';

describe('PublisherEventPort', () => {
  it('should be an abstract class', () => {
    expect(typeof WebhookEventPublisherPort).toBe('function');
    expect(WebhookEventPublisherPort.prototype.publish).toBeUndefined();
  });

  it('should be implementable as a concrete class', () => {
    class MockPublisher extends WebhookEventPublisherPort {
      async publish(eventName: string, payload: Record<string, any>) {}
    }

    const publisher = new MockPublisher();
    expect(publisher).toBeInstanceOf(WebhookEventPublisherPort);
  });
});
