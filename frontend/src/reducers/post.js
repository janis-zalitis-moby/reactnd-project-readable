import {
  LOAD_POST,
} from '../actions/post';

export default function post(state = { post: null }, action) {
  switch (action.type) {
    case LOAD_POST:
      return {
        ...state,
        post: action.post,
      };
    default:
      return state;
  }
}
