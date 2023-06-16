import axios from 'axios';

const NO_DATA = ['get', 'detele'];

export const fetchApiCall = async (url, method, data, config = {}) => {
  try {
    const callFn = axios[method];
    const res = NO_DATA.includes(method) ? await callFn(url, config) : await callFn(url, data, config);

    return res && res.data;
  } catch (error) {
    throw new Error(error);
  }
};