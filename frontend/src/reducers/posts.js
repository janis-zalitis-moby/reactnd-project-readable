import {
  LOAD_POSTS,
} from '../actions/posts';

import {
  LOAD_CATEGORY_POSTS,
} from '../actions/categoryPosts';

export default function posts (state = [], action) {
  const { type, posts } = action;
  switch (type) {
    case LOAD_POSTS :
    return {
      ...state,
      items: posts
    };
    case LOAD_CATEGORY_POSTS :
    return {
      ...state,
      items: posts
    };
    default :
      return state;
  }
}