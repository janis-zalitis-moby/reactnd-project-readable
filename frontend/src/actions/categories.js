import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories,
});

export default function fetchCategories() {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/categories`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(data => {
        dispatch(loadCategories(data.data.categories));
      })
      .catch(err => { window.console.info('fetch error', err); });
  };
}
