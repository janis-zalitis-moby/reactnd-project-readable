import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// visuals
import {
  AppBar,
} from 'material-ui';

import PostDialog from './../../components/PostDialog';
import PostsTable from './../../components/PostsTable';
import CategoryList from './../../components/CategoryList';

//styling
// import styles from './index.css';

// reducers
import fetchCategories from './../../actions/categories';
import { fetchPosts, addPost } from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  marginTop: 20,
  marginLeft: 20,
}

class Home extends Component {
  
  state = {
    postDialogOpen: false,
  };
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts());
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.outdated && nextProps.outdated !== this.props.outdated)
    {
      // refetch data
      this.props.dispatch(fetchPosts());
    }
  }
  
  postDialogSubmit = (newPost) => {
    this.props.dispatch(addPost(newPost));

    this.setState({ postDialogOpen: false });
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
          <PostsTable
            list={posts}
            posts={posts}
            categories={categories}
            onNewPost={() => this.setState({ postDialogOpen: true })}
          />
        </div>
        <div style={{ float: 'right', width: 305 }}>
          <CategoryList categories={categories} />
        </div>
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
  outdated: PropTypes.bool,
};

Home.defaultProps = {
  categories: [],
  posts: [],
  outdated: false,
};


export default withRouter(connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
  outdated: state.posts.outdated,
}))(Home));
