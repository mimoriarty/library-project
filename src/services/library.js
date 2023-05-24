import axios from 'axios';

import { BASE_URL } from '../constants';

const BOOKS = 'library';
const NO_DATA = ['get', 'detele'];
const getBooks = async () => await __fetchApiCall(`${BASE_URL}/${BOOKS}`, 'get');
const saveBook = async (data) => await __fetchApiCall(`${BASE_URL}/${BOOKS}`, 'post', data);
const updateBook = async (data) => await __fetchApiCall(`${BASE_URL}/${BOOKS}/${data.id}`, 'put', data);
const deleteBook = async (id) => await __fetchApiCall(`${BASE_URL}/${BOOKS}/${id}`, 'delete');

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
  getBooks,
  saveBook,
  updateBook,
  deleteBook,
}