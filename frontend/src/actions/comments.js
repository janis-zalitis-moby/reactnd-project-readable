import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';

const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments,
});

export default function fetchCommentsForPost(postId) {
  return dispatch => {
    axios
      .get(`${apiUrl}/posts/${postId}/comments`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(loadComments(data.data));
      })
      .catch(err => { window.console.info('fetch error'); }); // TODO: make an error param
  };
}