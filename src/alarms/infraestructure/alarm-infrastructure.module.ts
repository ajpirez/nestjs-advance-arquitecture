import { Module } from '@nestjs/common';
import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.model';
import { InMemoryPersistenceModel } from './persistence/in-memory/in-memory-persistence.model';

@Module({})
export class AlarmInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm' ? OrmAlarmPersistenceModule : InMemoryPersistenceModel;
    return {
      module: AlarmInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
