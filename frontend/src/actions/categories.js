import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories,
});

export default function fetchCategories() {
  return dispatch => {
    // dispatch(startCategories()); // TODO: make a loading param
    
    axios
      .get(`${apiUrl}/categories`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(loadCategories(data.data.categories));
      })
      .catch(err => { window.console.info('fetch error'); }); // TODO: make an error param
  };
}