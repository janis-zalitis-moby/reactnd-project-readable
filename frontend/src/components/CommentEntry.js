import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

const CommentEntry = ({
  comment,
  upVote,
  downVote,
  onDelete,
  onEdit,
}) => {
  const date = new Date(parseInt(comment.timestamp, 10));
  return (
    <Card style={{ maxWidth: 957 }}>
      <CardTitle
        subtitle={`Commented by: ${comment.author}, on: ${date.toUTCString()}, votes: ${comment.voteScore}`}
      />
      <CardText>{comment.body}</CardText>
      <CardActions style={{ textAlign: 'right' }}>
        <FlatButton label="Edit" onClick={onEdit} />
        <FlatButton label="Delete" onClick={onDelete} />
        <FlatButton label="Agree" onClick={upVote} />
        <FlatButton label="Disagree" onClick={downVote} />
      </CardActions>
    </Card>
  );
};

CommentEntry.propTypes = {
  comment: PropTypes.object.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};


export default CommentEntry;
