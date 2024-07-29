import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { Alarm } from 'src/alarms/domain/alarm';
import { CreateAlarmCommand } from './create-alarm-command';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand, Alarm>
{
  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    // const newAlarm = await this.alarmRepository.save(alarm);
    // This call the apply() method of the aggragate
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();

    return alarm;
  }
}
