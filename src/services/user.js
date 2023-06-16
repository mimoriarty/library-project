import { fetchApiCall } from '../utils/fetch';
import { BASE_URL } from '../constants';

const USERS = 'users';
const getUsers = async () => await fetchApiCall(`${BASE_URL}/${USERS}`, 'get');
const saveUser = async (data) => await fetchApiCall(`${BASE_URL}/${USERS}`, 'post', data);
const updateUser = async (data) => await fetchApiCall(`${BASE_URL}/${USERS}/${data.id}`, 'put', data);
const deleteUser = async (id) => await fetchApiCall(`${BASE_URL}/${USERS}/${id}`, 'delete');

export {
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
}