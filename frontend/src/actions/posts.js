import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POSTS = 'LOAD_POSTS';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts,
});

export default function fetchPosts() {
  return dispatch => {
    // dispatch(startPosts()); // TODO: make a loading param
    
    axios
      .get(`${apiUrl}/posts`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(loadPosts(data.data));
      })
      .catch(err => { window.console.info('fetch error'); }); // TODO: make an error param
  };
}