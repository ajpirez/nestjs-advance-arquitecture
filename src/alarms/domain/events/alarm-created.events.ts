import { Alarm } from '../alarm';
import { AutowiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutowiredEvent
export class AlarmCreatedEvents {
  constructor(public readonly alarm: Alarm) {}
}
