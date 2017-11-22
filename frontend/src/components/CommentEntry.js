import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
// import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const CommentEntry = ({comment}) => {
  const date = new Date(parseInt(comment.timestamp, 10));
  return (
    <Card>
      <CardTitle
        subtitle={`Commented by: ${comment.author}, posted on: ${date.toUTCString()}, votes: ${comment.voteScore}`}
      />
      <CardText>{comment.body}</CardText>
    </Card>
  );
};

export default CommentEntry;