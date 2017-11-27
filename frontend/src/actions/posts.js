import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_CATEGORY_POSTS = 'LOAD_CATEGORY_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_POST = 'UPDATE_POST';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts,
});

const loadCategoryPosts = posts => ({
  type: LOAD_CATEGORY_POSTS,
  posts,
});

// triggers refetch of all posts
const updatePosts = () => ({
  type: UPDATE_POSTS,
});

// updates the current post inside store
const updatePost = post => ({
  type: UPDATE_POST,
  post
});

export function fetchPosts() {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/posts`,
        { headers: apiHeaders }
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
        { headers: apiHeaders }
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
        { headers: apiHeaders }
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
        { headers: apiHeaders }
      )
      .then((data) => {
        dispatch(updatePost(data.data)); // update post data from POST return
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
        dispatch(updatePosts()); // re-fetch
      })
      .catch(err => { window.console.info('delete error', err); });
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
      .then((data) => {
        dispatch(updatePost(data.data)); // update post data from POST return
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
      .then((data) => {
        dispatch(updatePost(data.data)); // update post data from POST return
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function fetchCommentCount(post) {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/posts/${post.id}/comments`,
        { headers: apiHeaders }
      )
      .then(data => {
        const newPost = { ...post, commentCount: data.data.length }; // clone to avoid manipulating store directly
        dispatch(updatePost(newPost)); // update post data with commentCount
      })
      .catch(err => { window.console.info('fetch error', err); });
  };
}