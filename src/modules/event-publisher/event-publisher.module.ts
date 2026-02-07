import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PublisherEventPort } from '../../ddd/core/application/ports/event-publisher/repositories/publisher-event.port/publisher-event.port';
import { VaultModule } from '../vault/vault.module';
import { EventPublisherAdapter } from './event-publisher.adapter';

@Module({
  imports: [HttpModule, VaultModule],
  providers: [
    {
      provide: PublisherEventPort,
      useClass: EventPublisherAdapter,
    },
  ],

  exports: [PublisherEventPort],
})
export class EventPublisherModule {}
