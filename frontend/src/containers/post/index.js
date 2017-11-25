import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  AppBar,
} from 'material-ui';

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
  editComment
} from './../../actions/comments';

const postsContainerStyle = {
  padding: 20,
}

class Post extends Component {
  
  state = {
    commentDialogOpen: false,
    currentComment: null,
    postDialogOpen: false,
    currentPost: null,
    post: {}
  };
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.post)
    {
      this.setState({ post: nextProps.post });
    }
  }
  
  handleDeletePost = () => {
    const { post, dispatch } = this.props;
    
    dispatch(deletePost(post.post.id));
    
    // redirect to category
    this.context.router.history.push(`/category/${post.post.category}`);
  }
  
  postDialogSubmit = (newPost) => {
    this.props.dispatch(editPost(newPost));

    this.setState({
      postDialogOpen: false,
      currentPost: null,
      post: { post: newPost }
    });
  }
  
  commentDialogSubmit = (newComment) => {
    const { post } = this.state;
  
    if(this.state.currentComment) {
      this.props.dispatch(editComment(newComment));
    } else {
      this.props.dispatch(addComment({ parentId: post.post.id, ...newComment }));
    }
    this.setState({ commentDialogOpen: false, currentComment: null });
  }
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPost(this.props.match.params.postId));
    this.props.dispatch(fetchCommentsForPost(this.props.match.params.postId));
  }

  render() {
    const { comments, categories } = this.props;
    const { post, commentDialogOpen, postDialogOpen, currentPost } = this.state;
    
    const sortedComments = comments.sort((a, b) => a.voteScore < b.voteScore);

    return (
      <div>
        <AppBar
          title="readable"
          // iconElementLeft={false} // TODO: make it meaningful
        />
        <div style={postsContainerStyle}>
          {post.post ?
            <PostEntry
              post={post.post}
              upVote={() => this.props.dispatch(upVotePost(post.post.id))}
              downVote={() => this.props.dispatch(downVotePost(post.post.id))}
              onComment={() => this.setState({ commentDialogOpen: true, currentComment: null })}
              onEdit={() => this.setState({ postDialogOpen: true, currentPost: post.post })}
              onDelete={() => this.handleDeletePost()}
            />
            : null
          }
          {comments.length ?
            sortedComments.map(comment => 
              <CommentEntry
                key={comment.id}
                upVote={() => this.props.dispatch(upVoteComment(post.post.id, comment.id))}
                downVote={() => this.props.dispatch(downVoteComment(post.post.id, comment.id))}
                onDelete={() => this.props.dispatch(deleteComment(comment))}
                onEdit={() => this.setState({ commentDialogOpen: true, currentComment: comment })}
                comment={comment}
              />)
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
      replace: PropTypes.func.isRequired
    }).isRequired,
    staticContext: PropTypes.object
  }).isRequired
};

export default withRouter(connect(state => ({
  post: state.post,
  comments: state.comments.items,
  categories: state.categories.items,
}))(Post));
