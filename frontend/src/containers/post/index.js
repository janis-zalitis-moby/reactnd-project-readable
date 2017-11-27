import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TopBar from './../../components/TopBar';

import PostEntry from './../../components/PostEntry';
import PostDialog from './../../components/PostDialog';

import CommentEntry from './../../components/CommentEntry';
import CommentDialog from './../../components/CommentDialog';

import fetchCategories from './../../actions/categories';
import { fetchPost, upVotePost, downVotePost } from './../../actions/post';
import { editPost, deletePost } from './../../actions/posts';
import {
  fetchCommentsForPost,
  upVoteComment,
  downVoteComment,
  addComment,
  deleteComment,
  editComment,
} from './../../actions/comments';

const postsContainerStyle = {
  padding: 20,
};

class Post extends Component {
  state = {
    commentDialogOpen: false,
    currentComment: null,
    postDialogOpen: false,
    currentPost: null,
    post: {},
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPost(this.props.match.params.postId));
    this.props.dispatch(fetchCommentsForPost(this.props.match.params.postId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      if (nextProps.post.post && nextProps.post.post.id === false) {
        // post does not exist, redirect back to home page
        this.context.router.history.push('/');
      } else {
        this.setState({ post: nextProps.post });
      }
    }
  }

  /**
   * handles deletion of post
   * and redirects to parent category as post is no longer viewable
   */
  handleDeletePost = () => {
    const { post, dispatch } = this.props;

    dispatch(deletePost(post.post.id));

    // redirect to category
    this.context.router.history.push(`/${post.post.category}`);
  }

  /**
   * handles data submitted from Post add/edit dialog
   * saves post
   * closes dialog
   * @param  {object} newPost the edited post
   */
  postDialogSubmit = newPost => {
    this.props.dispatch(editPost(newPost));

    this.setState({
      postDialogOpen: false,
      currentPost: null,
      post: { post: newPost },
    });
  }

  /**
   * handles data submitted from Comment add/edit dialog
   * detects if new or edited
   * saves
   * closes dialog
   * @param  {object} newComment the new or edited comment
   */
  commentDialogSubmit = newComment => {
    const { post } = this.state;

    if (this.state.currentComment) {
      this.props.dispatch(editComment(newComment));
    } else {
      this.props.dispatch(addComment({ parentId: post.post.id, ...newComment }));
    }
    this.setState({ commentDialogOpen: false, currentComment: null });
  }

  render() {
    const { comments, categories } = this.props;
    const {
      post,
      commentDialogOpen,
      postDialogOpen,
      currentPost,
    } = this.state;

    // sort comments by voteScore DESC
    const sortedComments = comments.sort((a, b) => a.voteScore < b.voteScore);

    return (
      <div>
        <TopBar />
        <div style={postsContainerStyle}>
          {post.post ?
            <PostEntry
              post={post.post}
              upVote={() => this.props.dispatch(upVotePost(post.post.id))}
              downVote={() => this.props.dispatch(downVotePost(post.post.id))}
              onComment={() => this.setState({ commentDialogOpen: true, currentComment: null })}
              onEdit={() => this.setState({ postDialogOpen: true, currentPost: post.post })}
              onDelete={() => this.handleDeletePost()}
              commentCount={comments.length}
            />
            : null
          }
          {comments.length ?
            sortedComments.map(comment =>
            (<CommentEntry
                key={comment.id}
                upVote={() => this.props.dispatch(upVoteComment(post.post.id, comment.id))}
                downVote={() => this.props.dispatch(downVoteComment(post.post.id, comment.id))}
                onDelete={() => this.props.dispatch(deleteComment(comment))}
                onEdit={() => this.setState({ commentDialogOpen: true, currentComment: comment })}
                comment={comment}
              />))
            : null
          }
          <CommentDialog
            comment={this.state.currentComment}
            open={commentDialogOpen}
            onSubmit={this.commentDialogSubmit}
            onClose={() => this.setState({ commentDialogOpen: false, currentComment: null })}
          />
          <PostDialog
            post={currentPost}
            categories={categories}
            open={postDialogOpen}
            onSubmit={this.postDialogSubmit}
            onClose={() => this.setState({ postDialogOpen: false })}
          />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object,
  comments: PropTypes.array,
  categories: PropTypes.array,
};

Post.defaultProps = {
  categories: [],
  post: null,
  comments: [],
};

Post.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    staticContext: PropTypes.object,
  }).isRequired,
};

export default withRouter(connect(state => ({
  post: state.post,
  comments: state.comments.items,
  categories: state.categories.items,
}))(Post));
