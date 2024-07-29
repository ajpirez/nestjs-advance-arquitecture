import { Injectable } from '@nestjs/common';
import { FindAlarmsRepository } from '../../../../application/ports/find-alarm.repository';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Model } from 'mongoose';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-models';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrmFindAlarmRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find();
  }
}
