import {AssigneeType, ChoreType} from '@constants/types/chores';
import {get} from 'lodash/fp';

export function parseAssignee(rawData: any): AssigneeType {
  const id = get('memberId', rawData);
  const avatar = get('avatar', rawData);
  const name = get('name', rawData);
  const isHost = get('isHost', rawData);

  return {
    id,
    avatar,
    name,
    isHost,
  };
}
export function parseAssignees(rawData: any[]): AssigneeType[] {
  const result: AssigneeType[] = rawData.map(item => {
    return parseAssignee(item);
  });
  return result;
}

export function parseChore(rawData: any): ChoreType {
  const id = get('choreId', rawData);
  const title = get('title', rawData);
  const status = get('status', rawData);
  const deadline = get('deadline', rawData);
  const repeatType = get('repeatType', rawData);
  const description = get('description', rawData);
  const assignees = parseAssignees(get('assignees', rawData));

  return {
    id,
    title,
    status,
    deadline,
    repeatType,
    description,
    assignees,
  };
}
export function parseChores(rawData: any[]): ChoreType[] {
  const result: ChoreType[] = rawData.map(item => {
    return parseChore(item);
  });
  return result;
}
