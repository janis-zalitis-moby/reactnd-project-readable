import {
  LOAD_POSTS,
  LOAD_CATEGORY_POSTS,
  UPDATE_POSTS,
  UPDATE_POST,
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
        outdated: false, // reset the outdated flag because data have been refreshed
      };
    case LOAD_CATEGORY_POSTS:
      return {
        ...state,
        items: action.posts,
        outdated: false, // reset the outdated flag because data have been refreshed
      };
    case UPDATE_POSTS:
      return {
        ...state,
        outdated: true, // used after a post has been added/deleted to identify need to refetch data
      };
    case UPDATE_POST:
      let newPosts = [];
      if (state.items.length) {
        newPosts = [ ...state.items ]; // clone data
        const index = state.items.findIndex(el => el.id === action.post.id);
        if (index !== -1) {
          newPosts[index] = { ...newPosts[index], ...action.post }; // replace any fields that were changed
        } else {
          newPosts.push(action.post);
        }
      } else {
        newPosts.push(action.post);
      }
      return {
        ...state,
        items: newPosts, // used after a post has been edited or voted on to update data without refetch
      };
    default:
      return state;
  }
}
