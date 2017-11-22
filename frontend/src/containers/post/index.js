import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostEntry from './../../components/PostEntry';
import CommentEntry from './../../components/CommentEntry';

import fetchPost from './../../actions/post';
import fetchCommentsForPost from './../../actions/comments';

const postsContainerStyle = {
  padding: 20,
}

class Post extends Component {
  
  componentDidMount() {
    // this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPost(this.props.match.params.postId));
    this.props.dispatch(fetchCommentsForPost(this.props.match.params.postId));
  }

  render() {
    const { post, comments } = this.props;

    return (
      <div style={postsContainerStyle}>
        {post.post ?
          <PostEntry post={post.post} />
          : null
        }
        {comments.length ?
          comments.map(comment => <CommentEntry key={comment.id} comment={comment} />)
          : null
        }
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  comments: PropTypes.array,
};

Post.defaultProps = {
  post: null,
  comments: [],
};

export default withRouter(connect(state => ({
  post: state.post,
  comments: state.comments.items,
}))(Post));
