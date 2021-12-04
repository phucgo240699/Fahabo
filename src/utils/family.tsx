import {FamilyType} from '@constants/types/family';

export const mixFamily = (oldData: FamilyType[], newData: FamilyType[]) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};
