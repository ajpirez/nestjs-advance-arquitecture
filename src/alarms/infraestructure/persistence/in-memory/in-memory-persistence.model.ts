import { Module } from '@nestjs/common';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '../../../application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    // InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryPersistenceModel {}
