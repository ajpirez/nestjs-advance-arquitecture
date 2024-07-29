import { Module } from '@nestjs/common';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarm.repository';
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
      provide: FindAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryPersistenceModel {}
