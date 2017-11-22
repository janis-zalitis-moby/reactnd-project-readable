import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const PostEntry = ({post}) => {
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
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
    </Card>
  );
};

export default PostEntry;