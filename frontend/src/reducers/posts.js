import {
  LOAD_POSTS,
} from '../actions/posts';

export default function posts (state = [], action) {
  const { type, posts } = action;
  switch (type) {
    case LOAD_POSTS :
    return {
      ...state,
      items: posts
    };
    default :
      return state;
  }
}