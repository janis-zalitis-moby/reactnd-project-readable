import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// visuals
import {
  AppBar,
  List,
  ListItem,
  Subheader
} from 'material-ui';

import PostsTable from './../../components/PostsTable';

//styling
// import styles from './index.css';

// reducers
import fetchCategories from './../../actions/categories';
import fetchPosts from './../../actions/posts';

const categoryStyle = {
  marginTop: 20,
  marginRight: 20,
  maxWidth: 300,
  padding: 20,
  border: '1px solid #ccc',
}

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
          {categories && categories.length ?
            (<List style={categoryStyle}>
              <Subheader>Categories</Subheader>
              {categories.map(category => (<ListItem key={category.path}>{category.name}</ListItem>))}
            </List>)
            : null
          }
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

export default connect(state => ({
  categories: state.categories.items,
  posts: state.posts.items,
}))(Home);
