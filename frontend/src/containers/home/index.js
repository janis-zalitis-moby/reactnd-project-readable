import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// visuals
import {
  AppBar,
} from 'material-ui';

import PostsTable from './../../components/PostsTable';
import CategoryList from './../../components/CategoryList';

//styling
// import styles from './index.css';

// reducers
import fetchCategories from './../../actions/categories';
import fetchPosts from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  padding: 20,
  marginTop: 20,
  marginLeft: 20,
  border: '1px solid #ccc',
}

class Home extends Component {
  
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts());
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
