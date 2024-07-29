import { Injectable } from '@nestjs/common';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mappers';
import { AlarmEntity } from '../entities/alarm.entity';
import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { FindAlarmRepository } from '../../../../application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '../../../../application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-models';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository
{

  private static alarms = new Map<string, AlarmEntity>();
  private static materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(InMemoryAlarmRepository.materializedAlarmViews.values());
  }
  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    InMemoryAlarmRepository.alarms.set(persistenceModel.id, persistenceModel);
    const newEntity = InMemoryAlarmRepository.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (InMemoryAlarmRepository.materializedAlarmViews.has(alarm.id)) {
      InMemoryAlarmRepository.materializedAlarmViews.set(alarm.id, {
        ...InMemoryAlarmRepository.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    InMemoryAlarmRepository.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
