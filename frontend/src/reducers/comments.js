import {
  LOAD_COMMENTS,
} from '../actions/comments';

export default function comments(state = [], action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        items: action.comments,
      };
    default:
      return state;
  }
}
