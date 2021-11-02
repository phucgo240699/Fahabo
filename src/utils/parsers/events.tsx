import {get} from 'lodash/fp';
import {EventType} from '@constants/types/events';
import {parseAssignees} from './chores';

export function parseEvent(rawData: any): EventType {
  const id = get('eventId', rawData);
  const title = get('title', rawData);
  const description = get('description', rawData);
  const from = get('from', rawData);
  const to = get('to', rawData);
  const repeatType = get('repeatType', rawData);
  const assignees = parseAssignees(get('assignees', rawData));

  return {
    id,
    title,
    from,
    to,
    repeatType,
    description,
    assignees,
  };
}

export function parseEvents(rawData: any[]): EventType[] {
  const result: EventType[] = rawData.map(item => {
    return parseEvent(item);
  });
  return result;
}
