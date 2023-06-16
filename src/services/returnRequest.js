import { fetchApiCall } from '../utils/fetch';
import { BASE_URL } from '../constants';

const RETURN_REQUESTS = 'returnRequests';
const getreturns = async () => await fetchApiCall(`${BASE_URL}/${RETURN_REQUESTS}`, 'get');
const saveReturn = async (data) => await fetchApiCall(`${BASE_URL}/${RETURN_REQUESTS}`, 'post', data);
const updateReturn = async (data) => await fetchApiCall(`${BASE_URL}/${RETURN_REQUESTS}/${data.id}`, 'put', data);
const deleteReturn = async (id) => await fetchApiCall(`${BASE_URL}/${RETURN_REQUESTS}/${id}`, 'delete');

export {
  getreturns,
  saveReturn,
  deleteReturn,
  updateReturn,
}