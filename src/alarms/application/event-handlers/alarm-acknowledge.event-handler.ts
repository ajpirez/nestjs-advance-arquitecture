import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SerializedEventPayload } from '../../../shared/domain/interfaces/serializable-event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';
import { AlarmAcknowledgeEvents } from '../../domain/events/alarm-acknowledge.events';

@EventsHandler(AlarmAcknowledgeEvents)
export class AlarmAcknowledgedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmAcknowledgeEvents>>
{
  private readonly logger = new Logger(AlarmAcknowledgedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmAcknowledgeEvents>) {
    this.logger.log(`Alarm acknowledged event: ${JSON.stringify(event)}`);
    // In a real-world application, we would have to ensure that this event is
    // redelivered in case of a failure. Otherwise, we would end up with an inconsistent state.
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
