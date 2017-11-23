import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POSTS = 'LOAD_POSTS';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts,
});

export function fetchPosts() {
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

export function addPost(post) {
  return dispatch => {
    axios
      .post(`${apiUrl}/posts/`, post,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(fetchPosts()); // re-fetch
      })
      .catch(err => { window.console.info('post error'); }); // TODO: make an error param
  };
};

export function editPost(post) {
  return dispatch => {
    axios
      .put(`${apiUrl}/posts/${post.id}`, post,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(fetchPosts()); // re-fetch
      })
      .catch(err => { window.console.info('post error'); }); // TODO: make an error param
  };
};

export function deletePost(post) {
  return dispatch => {
    axios
      .delete(`${apiUrl}/posts/${post.id}`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(fetchPosts()); // re-fetch
      })
      .catch(err => { window.console.info('delete error'); }); // TODO: make an error param
  };
};