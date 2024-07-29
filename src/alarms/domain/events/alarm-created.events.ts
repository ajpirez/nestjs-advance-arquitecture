import { Alarm } from '../alarm';

export class AlarmCreatedEvents {
  constructor(public readonly alarm: Alarm) {}
}
