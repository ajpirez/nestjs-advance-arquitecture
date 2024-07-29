import { AlarmReadModel } from '../../domain/read-models/alarm.read-models';

export abstract class FindAlarmRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}
