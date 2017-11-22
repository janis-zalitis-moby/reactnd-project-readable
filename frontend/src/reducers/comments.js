import {
  LOAD_COMMENTS,
} from '../actions/comments';

export default function comments (state = [], action) {
  const { type, comments } = action;
  switch (type) {
    case LOAD_COMMENTS :
    return {
      ...state,
      items: comments
    };
    default :
      return state;
  }
}