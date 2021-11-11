import {FamilyType} from '@constants/types/family';

export const mixFamily = (oldData: FamilyType[], newData: FamilyType[]) => {
  let uniqueData = new Set<FamilyType>(oldData);
  let result: FamilyType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
