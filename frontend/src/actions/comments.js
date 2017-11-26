import axios from 'axios';
import { apiUrl, apiHeaders } from './../apiUrlConfig';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';

const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments,
});

export function fetchCommentsForPost(postId) {
  return dispatch => {
    axios
      .get(
        `${apiUrl}/posts/${postId}/comments`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(data => {
        dispatch(loadComments(data.data));
      })
      .catch(err => { window.console.info('fetch error', err); });
  };
}

export function upVoteComment(postId, commentId) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/comments/${commentId}`, { option: 'upVote' },
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(fetchCommentsForPost(postId)); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function downVoteComment(postId, commentId) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/comments/${commentId}`, { option: 'downVote' },
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(fetchCommentsForPost(postId)); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function addComment(comment) {
  return dispatch => {
    axios
      .post(
        `${apiUrl}/comments/`, comment,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(fetchCommentsForPost(comment.parentId)); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function editComment(comment) {
  return dispatch => {
    axios
      .put(
        `${apiUrl}/comments/${comment.id}`, comment,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(fetchCommentsForPost(comment.parentId)); // re-fetch
      })
      .catch(err => { window.console.info('post error', err); });
  };
}

export function deleteComment(comment) {
  return dispatch => {
    axios
      .delete(
        `${apiUrl}/comments/${comment.id}`,
        { headers: apiHeaders, withCredentials: true }
      )
      .then(() => {
        dispatch(fetchCommentsForPost(comment.parentId)); // re-fetch
      })
      .catch(err => { window.console.info('delete error', err); });
  };
}
