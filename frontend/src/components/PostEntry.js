import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

/**
 * Renders single post
 */
const PostEntry = ({
  post,
  upVote,
  downVote,
  onEdit,
  onDelete,
  onComment,
}) => {
  const categoryLink = `/category/${post.category}`;
  const date = new Date(parseInt(post.timestamp, 10));
  return (
    <Card style={{ maxWidth: 957 }}>
      <CardHeader
        title={(<span><Link to="/">Back to all posts</Link> &#124; <Link to={categoryLink}>Back to this post&apos;s category</Link></span>)}
      />
      <CardTitle
        title={post.title}
        subtitle={`Posted by: ${post.author}, on: ${date.toUTCString()}, votes: ${post.voteScore}`}
      />
      <CardText>
        {post.body}
      </CardText>
      <CardActions style={{ textAlign: 'right' }}>
        <FlatButton label="Edit" onClick={onEdit} />
        <FlatButton label="Delete" onClick={onDelete} />
        <FlatButton label="Agree" onClick={upVote} />
        <FlatButton label="Disagree" onClick={downVote} />
        <FlatButton label="Reply" onClick={onComment} />
      </CardActions>
    </Card>
  );
};

PostEntry.propTypes = {
  post: PropTypes.object.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};


export default PostEntry;
