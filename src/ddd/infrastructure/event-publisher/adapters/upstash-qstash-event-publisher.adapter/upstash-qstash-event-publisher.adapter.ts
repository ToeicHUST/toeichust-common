import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@upstash/qstash';
import { EventPublisherPort } from '../../../../core/application/ports/event-publisher/repositories/event-publisher.port';
import { IDomainEvent } from '../../../../core/domain/events/domain-event.interface';

@Injectable()
export class UpstashQstashEventPublisherAdapter implements EventPublisherPort {
  private readonly logger = new Logger(UpstashQstashEventPublisherAdapter.name);

  constructor(private readonly configService: ConfigService) {}

  async publish(event: IDomainEvent): Promise<void> {
    this.logger.debug(`Sending event: ${event.topic}...`);

    const MICROSERVICES_QSTASH_URL = this.configService.get<string>(
      'MICROSERVICES_QSTASH_URL',
    );

    if (!MICROSERVICES_QSTASH_URL) {
      this.logger.warn('MICROSERVICES_QSTASH_URL is not set!');
    }
    const MICROSERVICES_QSTASH_TOKEN = this.configService.get<string>(
      'MICROSERVICES_QSTASH_TOKEN',
    );

    if (!MICROSERVICES_QSTASH_TOKEN) {
      this.logger.warn('MICROSERVICES_QSTASH_TOKEN is not set!');
    }

    try {
      const client = new Client({
        baseUrl: MICROSERVICES_QSTASH_URL,
        token: MICROSERVICES_QSTASH_TOKEN,
      });

      const result = await client.publishJSON({
        topic: 'events',
        body: {
          event: event,
        },
      });

      // this.logger.debug('Message ID:', result.messageId);

      this.logger.log(`Event: "${event.topic}" delivered successfully.`);
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
