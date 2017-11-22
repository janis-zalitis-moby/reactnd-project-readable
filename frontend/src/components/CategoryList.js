import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import {
  List,
  ListItem,
  Subheader
} from 'material-ui';

const categoryStyle = {
  marginTop: 20,
  marginRight: 20,
  maxWidth: 300,
  padding: 20,
  border: '1px solid #ccc',
}

class CategoryList extends Component {

  render(){
    const { categories } = this.props;
    
    return (
      <List style={categoryStyle}>
        <Subheader>Categories</Subheader>
        {categories.map(category => (
          <ListItem
            key={category.path}
            onClick={() => this.context.router.history.push(`/category/${category.path}`)}
          >
            {category.name}
          </ListItem>
        ))}
      </List>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
};

CategoryList.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    staticContext: PropTypes.object
  }).isRequired
};


CategoryList.defaultProps = {
  categories: [],
};

export default withRouter(CategoryList);
