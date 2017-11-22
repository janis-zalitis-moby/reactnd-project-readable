import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const PostEntry = ({post}) => {
  const categoryLink = `/category/${post.category}`;
  return(
    <Card>
      <CardHeader
        title={<Link to={categoryLink}>Back to category</Link>}
        // subtitle="Subtitle"
        // avatar="images/jsa-128.jpg"
      />
      <CardTitle title={post.title} subtitle={`By: ${post.author}`} />
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