import axios from 'axios';

import { BASE_URL } from '../constants';

const USERS = 'users';
const NO_DATA = ['get', 'detele'];
const getUsers = async () => await __fetchApiCall(`${BASE_URL}/${USERS}`, 'get');
const saveUser = async (data) => await __fetchApiCall(`${BASE_URL}/${USERS}`, 'post', data);
const updateUser = async (data) => await __fetchApiCall(`${BASE_URL}/${USERS}/${data.id}`, 'put', data);
const deleteUser = async (id) => await __fetchApiCall(`${BASE_URL}/${USERS}/${id}`, 'delete');

const __fetchApiCall = async (url, method, data, config = {}) => {
  try {
      const callFn = axios[method];
      const res = NO_DATA.includes(method) ? await callFn(url, config) : await callFn(url, data, config);

      return res && res.data;
  } catch (error) {
    throw new Error(error);
  }
}


export {
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
}