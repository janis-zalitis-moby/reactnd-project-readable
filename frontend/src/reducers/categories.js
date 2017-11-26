import {
  LOAD_CATEGORIES,
} from '../actions/categories';

export default function categories(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        items: action.categories,
      };
    default:
      return state;
  }
}
