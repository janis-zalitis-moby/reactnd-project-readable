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
import { fetchCategoryPosts, addPost } from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  marginTop: 20,
  marginLeft: 20,
}

class Category extends Component {
  
  state = {
    postDialogOpen: false,
  };
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCategoryPosts(this.props.match.params.category));
  }
  
  componentWillReceiveProps(nextProps) {
    // if we navigated to new category
    if(nextProps.match.params.category && nextProps.match.params.category !== this.props.match.params.category)
    {
      this.props.dispatch(fetchCategoryPosts(nextProps.match.params.category));
    }
    
    // if we got info that post data got updated
    if(nextProps.outdated && nextProps.outdated !== this.props.outdated)
    {
      // refetch data
      this.props.dispatch(fetchCategoryPosts(this.props.match.params.category));
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
            category={this.props.match.params.category}
          />
        </div>
        <div style={{ float: 'right', width: 305 }}>
          <CategoryList categories={categories} />
        </div>
        <PostDialog
          post={null}
          categories={categories}
          category={this.props.match.params.category}
          open={postDialogOpen}
          onSubmit={this.postDialogSubmit}
          onClose={() => this.setState({ postDialogOpen: false })}
        />
      </div>
    );
  }
}

Category.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array,
  posts: PropTypes.array,
  outdated: PropTypes.bool,
};

Category.defaultProps = {
  categories: [],
  posts: [],
  outdated: false,
};

export default withRouter(connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
  outdated: state.posts.outdated,
}))(Category));
