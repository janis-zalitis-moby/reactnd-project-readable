import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_CATEGORY_POSTS = 'LOAD_CATEGORY_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts,
});

const loadCategoryPosts = posts => ({
  type: LOAD_CATEGORY_POSTS,
  posts,
});

const updatePosts = () => ({
  type: UPDATE_POSTS,
});

export function fetchPosts() {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/posts`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(data => {
        dispatch(loadPosts(data.data));
      })
      .catch(err => { window.console.info('fetch error', err); });
  };
}

export function fetchCategoryPosts(category) {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/${category}/posts`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(data => {
        dispatch(loadCategoryPosts(data.data));
      })
      .catch(err => { window.console.info('fetch error', err); });
  };
}

export function addPost(post) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/posts/`,
        post,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(updatePosts()); // trigger re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function editPost(post) {
  return dispatch => {
    axios
      .put(
        `${apiUrl}/posts/${post.id}`, post,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(updatePosts()); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function deletePost(postId) {
  return dispatch => {
    axios
      .delete(
        `${apiUrl}/posts/${postId}`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(updatePosts()); // re-fetch
      })
      .catch(err => { window.console.info('delete error', err); });
  };
}
