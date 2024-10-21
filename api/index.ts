import {create} from 'apisauce';

export const BASE_URL = 'http://52.55.77.181/';

export const api = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});