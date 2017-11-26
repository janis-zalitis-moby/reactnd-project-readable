import {
  LOAD_POSTS,
  LOAD_CATEGORY_POSTS,
  UPDATE_POSTS,
} from '../actions/posts';

const initialState = {
  outdated: false, // signifies a known update in post data on server, used to trigger refetching
  items: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        items: action.posts,
        outdated: false,
      };
    case LOAD_CATEGORY_POSTS:
      return {
        ...state,
        items: action.posts,
        outdated: false,
      };
    case UPDATE_POSTS:
      return {
        ...state,
        outdated: true,
      };
    default:
      return state;
  }
}
