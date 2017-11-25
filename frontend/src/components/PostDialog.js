import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import uuidv1 from 'uuid/v1';

class PostDialog extends Component {
  state = {
    author: '',
    body: '',
    title: '',
    category: null,
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.post){
      this.setState({
        author: nextProps.post.author,
        title: nextProps.post.title,
        body: nextProps.post.body,
        category: nextProps.post.category,
      });
    }
    
    if(nextProps.category) {
      this.setState({
        category: nextProps.category,
      });
    }
  }
  
  handleAuthorChange = (e, author) => this.setState({ author });
  
  handleBodyChange = (e, body) => this.setState({ body });
  
  handleTitleChange = (e, title) => this.setState({ title });
  
  handleCategoryChange = (e, category) => this.setState({ category: this.props.categories[category].path });
  
  handleSubmit = () => {
    
    const { post } = this.props;

    // existing post
    if (post && post.id)
    {
      const newPost = {
        ...post,
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category,
        timestamp: new Date().getTime(),
      }
      this.props.onSubmit(newPost);
    }
    else
    {
      // fill data
      const newPost = {
        id: uuidv1(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category,
        timestamp: new Date().getTime(),
      };
      this.props.onSubmit(newPost);
    }
  }

  render()
  {
    const { open, onClose, categories, post } = this.props;
    const { author, body, title, category } = this.state;
    
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
        title={(post && post.id ? "Edit post" : "Add new post")}
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
          name="title"
          floatingLabelText="Title of your post"
          hintText="Please enter title of your post"
          value={title}
          onChange={this.handleTitleChange}
        /><br />
        <TextField
          name="body"
          floatingLabelText="Your post"
          hintText="Please enter your post"
          style={{ width: '100%' }}
          multiLine={true}
          value={body}
          onChange={this.handleBodyChange}
        /><br />
        {categories && categories.length ? 
          <SelectField
            floatingLabelText="Select category"
            value={category}
            onChange={this.handleCategoryChange}
            autoWidth={true}
            style={{ display: 'inline-block' }}
          >
            {categories.map(category =>
              <MenuItem key={category.path} value={category.path} primaryText={category.name} />)}
          </SelectField>
          : null
        }
      </Dialog>
    );
  }
};

PostDialog.propTypes = {
  post: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  categories: PropTypes.array,
  category: PropTypes.string,
};

PostDialog.defaultProps = {
  post: {},
  open: false,
  categories: [],
  category: null,
};

export default PostDialog;