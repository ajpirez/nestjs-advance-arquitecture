import { AlarmReadModel } from '../../domain/read-models/alarm.read-models';

export abstract class FindAlarmsRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}
