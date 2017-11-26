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
import { fetchPosts, fetchCategoryPosts, addPost } from './../../actions/posts';

const postsTableStyle = {
  float: 'left',
  marginTop: 20,
  marginLeft: 20,
};

class Root extends Component {
  state = {
    postDialogOpen: false,
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
  }

  /**
   * handles data submitted from Post add/edit dialog
   * saves post
   * closes dialog
   * @param  {object} newPost the added post
   */
  postDialogSubmit = newPost => {
    this.props.dispatch(addPost(newPost));

    this.setState({ postDialogOpen: false });
  }

  render() {
    const { categories, posts } = this.props;
    const { postDialogOpen } = this.state;

    return (
      <div>
        <TopBar />
        <div style={postsTableStyle}>
          <PostsTable
            list={posts}
            posts={posts}
            categories={categories}
            onNewPost={() => this.setState({ postDialogOpen: true })}
            category={(this.props.match.params.category || null)}
          />
        </div>
        <div style={{ float: 'left', width: 305 }}>
          <CategoryList categories={categories} />
        </div>
        <PostDialog
          post={null}
          categories={categories}
          category={(this.props.match.params.category || null)}
          open={postDialogOpen}
          onSubmit={this.postDialogSubmit}
          onClose={() => this.setState({ postDialogOpen: false })}
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
