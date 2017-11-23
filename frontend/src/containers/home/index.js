import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// visuals
import {
  AppBar,
} from 'material-ui';

import FlatButton from 'material-ui/FlatButton';

import PostDialog from './../../components/PostDialog';

import PostsTable from './../../components/PostsTable';
import CategoryList from './../../components/CategoryList';

//styling
// import styles from './index.css';

// reducers
import fetchCategories from './../../actions/categories';
import { fetchPosts, editPost, addPost, deletePost } from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  padding: 20,
  marginTop: 20,
  marginLeft: 20,
  border: '1px solid #ccc',
}

class Home extends Component {
  
  state = {
    postDialogOpen: false,
  };
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts());
  }
  
  postDialogSubmit = (newPost) => {
    console.info('postDialogSubmit', newPost);
    return false;

    const { post } = this.props;

    if(this.state.currentPost) {
      //this.props.dispatch(editPost(newPost));
    } else {
      //this.props.dispatch(addPost({ parentId: post.post.id, ...newPost }));
    }
    this.setState({ postDialogOpen: false, currentPost: null });
  }

  render() {
    const { categories, posts } = this.props;
    const { postDialogOpen } = this.state;
    
    return (
      <div>
        <AppBar
          title="readable"
          // iconElementLeft={false} // TODO: make it meaningful
        />
        <div style={postsTableStyle}>
          <PostsTable list={posts} posts={posts} categories={categories} />
        </div>
        <div style={{ float: 'right', width: 305 }}>
          <CategoryList categories={categories} />
        </div>
        <FlatButton label="Add New Post" onClick={() => this.setState({ postDialogOpen: true })} />
        <PostDialog
          post={null}
          categories={categories}
          open={postDialogOpen}
          onSubmit={this.postDialogSubmit}
          onClose={() => this.setState({ postDialogOpen: false })}
        />
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array,
  posts: PropTypes.array,
};

Home.defaultProps = {
  categories: [],
  posts: [],
};


export default withRouter(connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
}))(Home));
