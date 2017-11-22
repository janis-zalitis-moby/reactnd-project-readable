import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostEntry from './../../components/PostEntry';

import fetchPost from './../../actions/post';

const postsContainerStyle = {
  padding: 20,
}

class Post extends Component {
  
  componentDidMount() {
    // this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPost(this.props.match.params.postId));
  }

  render() {
    const { post } = this.props;

    return (
      <div style={postsContainerStyle}>
        {post.post ?
        <PostEntry post={post.post} />
        :
        null}
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
};

Post.defaultProps = {
  post: null,
};

export default withRouter(connect(state => ({
  post: state.post,
}))(Post));
