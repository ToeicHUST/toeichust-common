import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, retry, timer } from 'rxjs';
import { EventPublisherPort } from '../../../../core/application/ports/event-publisher/repositories/event-publisher.port';
import { IDomainEvent } from '../../../../core/domain/events/domain-event.interface/domain-event.interface';

@Injectable()
export class WebhookEventPublisherAdapter implements EventPublisherPort {
  private readonly logger = new Logger(WebhookEventPublisherAdapter.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async publish(event: IDomainEvent): Promise<void> {
    this.logger.debug(`Sending event: ${event.topic}...`);

    const MICROSERVICES_WEBHOOK_EVENT_URL =
      this.configService.get<string>('MICROSERVICES_WEBHOOK_EVENT_URL') || '';

    if (!MICROSERVICES_WEBHOOK_EVENT_URL) {
      this.logger.warn('MICROSERVICES_WEBHOOK_EVENT_URL is not set!');
    }

    try {
      await firstValueFrom(
        this.httpService
          .post(
            MICROSERVICES_WEBHOOK_EVENT_URL,
            { event },
            {
              headers: {
                'Content-Type': 'application/json',
                // TODO: thêm token
              },
            },
          )
          .pipe(
            retry({
              count: 3,
              delay: (error, retryCount) => timer(retryCount * 1000),
            }),
          ),
      );

      this.logger.log(`Event: "${event.topic}" delivered successfully.`);
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
