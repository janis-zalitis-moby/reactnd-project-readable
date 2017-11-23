import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POST = 'LOAD_POST';

const loadPost = post => ({
  type: LOAD_POST,
  post,
});

export function fetchPost(postId) {
  return dispatch => {
    // dispatch(startPosts()); // TODO: make a loading param
    
    axios
      .get(`${apiUrl}/posts/${postId}`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(loadPost(data.data));
      })
      .catch(err => { window.console.info('fetch error'); }); // TODO: make an error param
  };
}

export function upVotePost(postId) {
  return dispatch => {
    axios
      .post(`${apiUrl}/posts/${postId}`, { option: 'upVote' },
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(fetchPost(postId)); // re-fetch
        // dispatch(loadComments(data.data));
      })
      .catch(err => { window.console.info('post error'); }); // TODO: make an error param
  };
};

export function downVotePost(postId) {
  return dispatch => {
    axios
      .post(`${apiUrl}/posts/${postId}`, { option: 'downVote' },
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(fetchPost(postId)); // re-fetch
        // dispatch(loadComments(data.data));
      })
      .catch(err => { window.console.info('post error'); }); // TODO: make an error param
  };
};