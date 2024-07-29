import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';
import { AlarmAcknowledgeEvents } from './events/alarm-acknowledge.events';
import { SerializedEventPayload } from 'src/shared/domain/interfaces/serializable-event';
import { AlarmCreatedEvents } from './events/alarm-created.events';
import { BadRequestException } from "@nestjs/common";

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowlege() {
    this.apply(new AlarmAcknowledgeEvents(this.id));
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }

  [`on${AlarmCreatedEvents.name}`](
    event: SerializedEventPayload<AlarmCreatedEvents>,
  ) {
    this.name = event.alarm.name;
    this.severity = new AlarmSeverity(event.alarm.severity);
    this.triggeredAt = new Date(event.alarm.triggeredAt);
    this.isAcknowledged = event.alarm.isAcknowledged;
    this.items = event.alarm.items.map((item) => {
      return new AlarmItem(item.id, item.name, item.type);
    });
  }

  [`on${AlarmAcknowledgeEvents.name}`](
    event: SerializedEventPayload<AlarmAcknowledgeEvents>,
  ) {
    if (this.isAcknowledged)
      throw new BadRequestException('Alarm has already been acknowledged');

    this.isAcknowledged = true;
  }
}
