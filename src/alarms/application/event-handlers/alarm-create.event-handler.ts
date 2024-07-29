import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvents } from '../../domain/events/alarm-created.events';
import { Logger } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmCreatedEvents)
export class AlarmCreateEventHandler
  implements IEventHandler<AlarmCreatedEvents>
{
  private readonly logger = new Logger(AlarmCreatedEvents.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: AlarmCreatedEvents) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: event.alarm.triggeredAt,
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }
}
