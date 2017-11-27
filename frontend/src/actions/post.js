import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POST = 'LOAD_POST';

const loadPost = post => ({
  type: LOAD_POST,
  post,
});

export function fetchPost(postId) {
  return dispatch => {
    dispatch(loadPost(null)); // clear post data
    axios
      .get(
        `${apiUrl}/posts/${postId}`,
        { headers: apiHeaders }
      )
      .then(data => {
        dispatch(loadPost(data.data));
      })
      .catch((err) => { 
        dispatch(loadPost({})); // signifies non existant post
      });
  };
}

export function upVotePost(postId) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/posts/${postId}`,
        { option: 'upVote' },
        { headers: apiHeaders }
      )
      .then(() => {
        dispatch(fetchPost(postId)); // re-fetch
        // dispatch(loadComments(data.data));
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function downVotePost(postId) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/posts/${postId}`, { option: 'downVote' },
        { headers: apiHeaders }
      )
      .then(() => {
        dispatch(fetchPost(postId)); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function deletePost(postId) {
  return dispatch => {
    axios
      .delete(
        `${apiUrl}/posts/${postId}`,
        { headers: apiHeaders }
      )
      .then(() => {
        dispatch(loadPost({})); // clear post data
      })
      .catch(err => { window.console.info('delete error', err); });
  };
}