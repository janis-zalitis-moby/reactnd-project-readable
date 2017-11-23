import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import uuidv1 from 'uuid/v1';

class CommentDialog extends Component {
  state = {
    author: '',
    body: '',
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.comment){
      this.setState({
        author: nextProps.comment.author,
        body: nextProps.comment.body,
      });
    }
  }
  
  handleAuthorChange = (e, author) => this.setState({ author });
  
  handleBodyChange = (e, body) => this.setState({ body });
  
  handleSubmit = () => {
    
    const { comment } = this.props;
    
    // existing comment
    if (comment.id)
    {
      const newComment = {
        ...comment,
        author: this.state.author,
        body: this.state.body,
        timestamp: new Date().getTime(),
      }
      this.props.onSubmit(newComment);
    }
    else
    {
      // fill data
      const newComment = {
        id: uuidv1(),
        author: this.state.author,
        body: this.state.body,
        timestamp: new Date().getTime(),
      };
      this.props.onSubmit(newComment);
    }
  }

  render()
  {
    const { open, onClose } = this.props;
    const { author, body } = this.state;
    
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={onClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          disabled={Boolean(!author.length || !body.length)}
          onClick={this.handleSubmit}
        />,
      ]
    
    return (
      <Dialog
        title="Type your comment below"
        actions={actions}
        modal={true}
        open={open}
      >
        <TextField
          name="author"
          floatingLabelText="Your name"
          hintText="Please enter your name"
          value={author}
          onChange={this.handleAuthorChange}
        /><br />
        <TextField
          name="body"
          floatingLabelText="Your comment"
          hintText="Please enter your comment"
          style={{ width: '100%' }}
          multiLine={true}
          value={body}
          onChange={this.handleBodyChange}
        />
      </Dialog>
    );
  }
};

CommentDialog.propTypes = {
  comment: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

CommentDialog.defaultProps = {
  comment: {},
  open: false,
};

export default CommentDialog;