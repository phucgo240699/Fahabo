import {ChoreType} from '@constants/types/chores';

export const mixChores = (oldData: ChoreType[], newData: ChoreType[]) => {
  let uniqueData = new Set<ChoreType>(oldData);
  let result: ChoreType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
