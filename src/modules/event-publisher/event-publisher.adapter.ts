import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PublisherEventPort } from '../../ddd/core/application/ports/event-publisher/repositories/publisher-event.port/publisher-event.port';
import { IBaseDomainEvent } from '../../ddd/events/base-domain-event.interface/base-domain-event.interface';
import { VaultService } from '../vault/vault.service';

@Injectable()
export class EventPublisherAdapter implements PublisherEventPort {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly vaultService: VaultService,
  ) {}

  async publish(event: IBaseDomainEvent): Promise<void> {
    this.logger.debug(`Sending ${event.topic}...`);

    const MICROSERVICES_WEBHOOK_EVENT_URL = this.vaultService.get<string>(
      'MICROSERVICES_WEBHOOK_EVENT_URL',
    );

    if (!MICROSERVICES_WEBHOOK_EVENT_URL) {
      this.logger.warn('MICROSERVICES_WEBHOOK_EVENT_URL is not set!');
    }

    try {
      await firstValueFrom(
        this.httpService.post(
          MICROSERVICES_WEBHOOK_EVENT_URL,
          { event },
          {
            headers: {
              'Content-Type': 'application/json',
              // TODO: thêm token
            },
          },
        ),
      );

      this.logger.log(`"${event.topic}" delivered successfully.`);
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
