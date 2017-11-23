import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
// import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const CommentEntry = ({comment, upVote, downVote, onDelete, onEdit}) => {
  const date = new Date(parseInt(comment.timestamp, 10));
  return (
    <Card>
      <CardTitle
        subtitle={`Commented by: ${comment.author}, posted on: ${date.toUTCString()}, votes: ${comment.voteScore}`}
      />
      <CardText>{comment.body}</CardText>
      <CardActions>
        <FlatButton label="Edit" onClick={onEdit} />
        <FlatButton label="Delete" onClick={onDelete} />
        <FlatButton label="Agree" onClick={upVote} />
        <FlatButton label="Disagree" onClick={downVote} />
      </CardActions>
    </Card>
  );
};

export default CommentEntry;