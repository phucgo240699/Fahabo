import {get} from 'lodash/fp';

export function parseDataResponse(response: any): any {
  return response.data.data;
}

export function parseErrorResponse(response: any): any {
  return response.data.errors[0];
}
