import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';
import { SerializedEventPayload } from 'src/shared/domain/interfaces/serializable-event';
import { AlarmCreatedEvents } from '../../domain/events/alarm-created.events';

@EventsHandler(AlarmCreatedEvents) // can handle multiple events
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvents>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvents>) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);

    // console.log({ event });

    // We can use a message broker to publish the event went we create the alarm and subscribe to it in the read model

    // In a real-world application, we would have to ensure that this operation is atomic
    // with the creation of the alarm. Otherwise, we could end up with an alarm that is not reflected
    // in the read model (e.g. because the database operation fails).
    // For more information, check out "Transactional inbox/outbox pattern".
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity['value'],
      triggeredAt: new Date(event.alarm.triggeredAt),
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }
}
