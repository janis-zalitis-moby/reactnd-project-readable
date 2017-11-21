import {
  LOAD_CATEGORIES,
} from '../actions/categories';

export default function categories (state = [], action) {
  const { type, categories } = action;
  switch (type) {
    case LOAD_CATEGORIES :
      return {
        ...state,
        items: categories
      };
    default :
      return state;
  }
}