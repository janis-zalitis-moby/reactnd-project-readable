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
import fetchCategoryPosts from './../../actions/categoryPosts';

const postsTableStyle = {
  float: 'left',
  padding: 20,
  marginTop: 20,
  marginLeft: 20,
  border: '1px solid #ccc',
}

class Category extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCategoryPosts(this.props.match.params.category));
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.category && nextProps.match.params.category !== this.props.match.params.category)
    {
      this.props.dispatch(fetchCategoryPosts(nextProps.match.params.category));
    }
  }

  render() {
    const { categories, posts } = this.props;
    
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
        
      </div>
    );
  }
}

Category.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array,
  posts: PropTypes.array,
};

Category.defaultProps = {
  categories: [],
  posts: [],
};

export default withRouter(connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
}))(Category));
