import {get} from 'lodash/fp';

export const parseGetAvatarResponse = (rawData: any) => {
  return {
    uri: get('uri', rawData),
  };
};
