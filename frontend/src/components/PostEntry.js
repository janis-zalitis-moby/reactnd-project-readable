import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const PostEntry = ({post, upVote, downVote, onEdit, onDelete, onComment}) => {
  const categoryLink = `/category/${post.category}`;
  const date = new Date(parseInt(post.timestamp, 10));
  return(
    <Card>
      <CardHeader
        title={<Link to={categoryLink}>Back to category</Link>}
      />
      <CardTitle
        title={post.title}
        subtitle={`Posted by: ${post.author}, posted on: ${date.toUTCString()}, votes: ${post.voteScore}`}
      />
      <CardText>
        {post.body}
      </CardText>
      <CardActions>
        <FlatButton label="Edit" />
        <FlatButton label="Delete" />
        <FlatButton label="Agree" onClick={upVote} />
        <FlatButton label="Disagree" onClick={downVote} />
        <FlatButton label="Reply" onClick={onComment} />
      </CardActions>
    </Card>
  );
};

export default PostEntry;