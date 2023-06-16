import { fetchApiCall } from '../utils/fetch';
import { BASE_URL } from '../constants';

const BOOKS = 'library';
const getBooks = async () => await fetchApiCall(`${BASE_URL}/${BOOKS}`, 'get');
const saveBook = async (data) => await fetchApiCall(`${BASE_URL}/${BOOKS}`, 'post', data);
const updateBook = async (data) => await fetchApiCall(`${BASE_URL}/${BOOKS}/${data.id}`, 'put', data);
const deleteBook = async (id) => await fetchApiCall(`${BASE_URL}/${BOOKS}/${id}`, 'delete');

export {
  getBooks,
  saveBook,
  updateBook,
  deleteBook,
}