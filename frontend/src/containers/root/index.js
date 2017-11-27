import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// visuals
import TopBar from './../../components/TopBar';
import PostDialog from './../../components/PostDialog';
import PostsTable from './../../components/PostsTable';
import CategoryList from './../../components/CategoryList';

// reducers
import fetchCategories from './../../actions/categories';
import {
  fetchPosts,
  fetchCategoryPosts,
  addPost,
  editPost,
  deletePost,
  upVotePost,
  downVotePost,
  fetchCommentCount
} from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  marginTop: 20,
  marginLeft: 20,
};

class Root extends Component {
  state = {
    postDialogOpen: false,
    currentPost: null,
    posts: []
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
    // if category param is present in URL
    if (this.props.match.params.category) {
      // fetch posts from that category
      this.props.dispatch(fetchCategoryPosts(this.props.match.params.category));
    } else {
      // otherwise, fetch all posts
      this.props.dispatch(fetchPosts());
    }
  }

  componentWillReceiveProps(nextProps) {
    // if we navigated to new category
    if (nextProps.match.params.category !== this.props.match.params.category) {
      // if it's a category, fetch posts from that category
      if (nextProps.match.params.category) {
        this.props.dispatch(fetchCategoryPosts(nextProps.match.params.category));
      } else {
        // fetch all posts
        this.props.dispatch(fetchPosts());
      }
    }

    // if a post was added/edited/deleted, this flag will be true, so need to refresh data
    if (nextProps.outdated && nextProps.outdated !== this.props.outdated) {
      if (this.props.match.params.category) {
        this.props.dispatch(fetchCategoryPosts(this.props.match.params.category));
      } else {
        this.props.dispatch(fetchPosts());
      }
    }
    
    // create a proxy data entry for posts
    // used to update voteScore directly without re-fetching
    if (nextProps.posts && nextProps.posts.length) {
       // only trigger recount if number of posts changed
       // NOTE: this has a hole in it, 
       // but I think it should be solved by extending the API to return comment count as part of post endpoint
       // as it is highly inefficient to make a separate call for every post just to count its comments
      if (
        nextProps.posts.length !== this.state.posts.length
        || nextProps.match.params.category !== this.props.match.params.category // OR navigation happened
      ) {
        this.setState({
          posts: nextProps.posts,
        }, () => this.triggerCommentRecount());        
      } else {
        this.setState({
          posts: nextProps.posts,
        });
      }
    } else {
      this.setState({
        posts: [],
      });
    }
  }
  
  /**
   * Recounts comments by triggering the comment count on every post
   * NOTE: this is inefficient and instead server API should expose
   * ability to get all comments at once and then scan them over to obtain count
   */
  triggerCommentRecount = () => {
    const { posts } = this.state;

    if (posts && posts.length) {
      posts.map(post => this.props.dispatch(fetchCommentCount(post)));
    }
  }

  /**
   * handles data submitted from Post add/edit dialog
   * detects if new or existing post
   * saves post
   * closes dialog
   * @param  {object} newPost the added or edited post
   */
  postDialogSubmit = newPost => {
    if(this.state.currentPost) {
      this.props.dispatch(editPost(newPost));
    } else {
      this.props.dispatch(addPost(newPost));
    }

    this.setState({ postDialogOpen: false, currentPost: null });
  }
  
  /**
   * handles upvoting of a post
   * @param  {integer} postId ID for post to up vote
   */
  handlePostUpVote = postId => {
    this.props.dispatch(upVotePost(postId));
  }
  
  /**
   * handles downvoting of a post
   * @param  {integer} postId ID for post to down vote
   */
  handlePostDownVote = postId => {
    this.props.dispatch(downVotePost(postId));
  }
  
  /**
   * handles deletion of post
   * @param  {object} post post to delete
   */
  handleDeletePost = (post) => {
    const { dispatch } = this.props;

    dispatch(deletePost(post.id));
  }

  render() {
    const { categories } = this.props;
    const { postDialogOpen, currentPost, posts } = this.state;

    return (
      <div>
        <TopBar />
        <div style={postsTableStyle}>
          <PostsTable
            posts={posts}
            categories={categories}
            onNewPost={() => this.setState({ postDialogOpen: true, currentPost: null })}
            onEdit={(post) => this.setState({ postDialogOpen: true, currentPost: post })}
            onDelete={(post) => this.handleDeletePost(post)}
            category={(this.props.match.params.category || null)}
            upVote={(postId) => this.props.dispatch(upVotePost(postId))}
            downVote={(postId) => this.props.dispatch(downVotePost(postId))}
          />
        </div>
        <div style={{ float: 'left', width: 305 }}>
          <CategoryList categories={categories} />
        </div>
        <PostDialog
          post={currentPost}
          categories={categories}
          category={(this.props.match.params.category || null)}
          open={postDialogOpen}
          onSubmit={this.postDialogSubmit}
          onClose={() => this.setState({ postDialogOpen: false, currentPost: null })}
        />
      </div>
    );
  }
}

Root.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array,
  posts: PropTypes.array,
  outdated: PropTypes.bool,
};

Root.defaultProps = {
  categories: [],
  posts: [],
  outdated: false,
};


export default withRouter(connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
  outdated: state.posts.outdated,
}))(Root));
