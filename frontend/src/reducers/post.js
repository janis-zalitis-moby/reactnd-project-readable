import {
  LOAD_POST,
} from '../actions/post';

export default function post (state = {}, action) {
  const { type, post } = action;
  switch (type) {
    case LOAD_POST:
    return {
      ...state,
      post
    };
    default :
      return state;
  }
}