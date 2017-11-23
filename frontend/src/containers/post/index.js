import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostEntry from './../../components/PostEntry';
import CommentEntry from './../../components/CommentEntry';

import { fetchPost, upVotePost, downVotePost } from './../../actions/post';
import { fetchCommentsForPost, upVoteComment, downVoteComment } from './../../actions/comments';

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
    
    const sortedComments = comments.sort((a, b) => a.voteScore < b.voteScore);

    return (
      <div style={postsContainerStyle}>
        {post.post ?
          <PostEntry
            post={post.post}
            upVote={() => this.props.dispatch(upVotePost(post.post.id))}
            downVote={() => this.props.dispatch(downVotePost(post.post.id))}
          />
          : null
        }
        {comments.length ?
          sortedComments.map(comment => 
            <CommentEntry
              key={comment.id}
              upVote={() => this.props.dispatch(upVoteComment(post.post.id, comment.id))}
              downVote={() => this.props.dispatch(downVoteComment(post.post.id, comment.id))}
              comment={comment}
            />)
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
