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
  type: UPDATE_POSTS
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

export function fetchCategoryPosts(category) {
  return dispatch => {
    // dispatch(startPosts()); // TODO: make a loading param
    
    axios
      .get(`${apiUrl}/${category}/posts`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(loadCategoryPosts(data.data));
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
        dispatch(updatePosts()); // trigger re-fetch
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
        dispatch(updatePosts()); // re-fetch
      })
      .catch(err => { window.console.info('post error'); }); // TODO: make an error param
  };
};

export function deletePost(postId) {
  return dispatch => {
    axios
      .delete(`${apiUrl}/posts/${postId}`,
        {
          //withCredentials: true,
          headers: apiHeaders
        }
      )
      .then(data => {
        dispatch(updatePosts()); // re-fetch
      })
      .catch(err => { window.console.info('delete error'); }); // TODO: make an error param
  };
};