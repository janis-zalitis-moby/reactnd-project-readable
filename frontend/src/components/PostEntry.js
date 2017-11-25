import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const PostEntry = ({post, upVote, downVote, onEdit, onDelete, onComment}) => {
  const categoryLink = `/category/${post.category}`;
  const date = new Date(parseInt(post.timestamp, 10));
  return(
    <Card style={{ maxWidth: 957 }}>
      <CardHeader
        title={(<span><Link to='/'>Back to all posts</Link> &#124; <Link to={categoryLink}>Back to this post&apos;s category</Link></span>)}
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

export default PostEntry;