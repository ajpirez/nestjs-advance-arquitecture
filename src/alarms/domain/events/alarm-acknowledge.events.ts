import { AutowiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutowiredEvent
export class AlarmAcknowledgeEvents {
  constructor(public readonly alarmId: string) {}
}
