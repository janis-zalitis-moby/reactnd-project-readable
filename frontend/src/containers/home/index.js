import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// visuals
import { AppBar, List, ListItem } from 'material-ui';

import fetchCategories from './../../actions/categories';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { categories } = this.props;
    
    return (
      <div>
        <AppBar
          title="readable"
          // iconElementLeft={false} // TODO: make it meaningful
        />
        {categories && categories.length ?
          (<List>
            {categories.map(category => (<ListItem key={category.path}>{category.name}</ListItem>))}
          </List>)
          : null
        }
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default connect(state => ({
  categories: state.categories,
}))(Home);
