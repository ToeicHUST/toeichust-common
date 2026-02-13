import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UpstashQstashEventPublisherPort } from '../../ddd/core/application/ports/event-publisher/repositories/upstash-qstash-event-publisher.port/upstash-qstash-event-publisher.port';
import { WebhookEventPublisherPort } from '../../ddd/core/application/ports/event-publisher/repositories/webhook-event-publisher.port/webhook-event-publisher.port';
import { UpstashQstashEventPublisherAdapter } from '../../ddd/infrastructure/event-publisher/adapters/upstash-qstash-event-publisher.adapter/upstash-qstash-event-publisher.adapter';
import { WebhookEventPublisherAdapter } from '../../ddd/infrastructure/event-publisher/adapters/webhook-event-publisher.adapter/webhook-event-publisher.adapter';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    {
      provide: WebhookEventPublisherPort,
      useClass: WebhookEventPublisherAdapter,
    },
    {
      provide: UpstashQstashEventPublisherPort,
      useClass: UpstashQstashEventPublisherAdapter,
    },
  ],

  exports: [UpstashQstashEventPublisherPort, WebhookEventPublisherPort],
})
export class EventPublisherModule {}
