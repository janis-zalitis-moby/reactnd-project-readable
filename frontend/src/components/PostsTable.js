import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Table,
  Column,
  SortIndicator,
  SortDirection,
} from 'react-virtualized';


const rowHeight = 40;

class PostsTable extends Component {
  
  state = {
    sortBy: 'voteScore',
    sortDirection: SortDirection.ASC,
    sortedPosts: []
  };
  
  componentWillReceiveProps = (nextProps) => {
    const { posts } = nextProps;

    if(posts.length){
      this.setState({
        sortedPosts: this.sortPosts(posts)
      });
    }
    else
    {
      this.setState({
        sortedPosts: []
      });
    }
  }
  
  changeSort = ({sortBy, sortDirection}) => {
    this.setState({ 
      sortBy, 
      sortDirection: (
        this.state.sortBy !== sortBy ? SortDirection.ASC
        : (sortDirection !== SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC)
      )
    }, () => {
      this.setState({ sortedPosts: this.sortPosts(this.props.posts) });
    })
  }
  
  headerRenderer(props) {
    return (
      <div>
        {props.label}
        {props.sortBy === props.dataKey && <SortIndicator sortDirection={props.sortDirection} />}
      </div>
    );
  }
  
  sortPosts = posts =>
  {
    const sortedPosts = posts.sort((a, b) => a[this.state.sortBy] < b[this.state.sortBy]);
    
    if(this.state.sortDirection === SortDirection.DESC) {
      sortedPosts.reverse()
    };
    
    return sortedPosts;
  }

  render () {
    // const { categories } = this.props;
    const { sortedPosts } = this.state;

    return (
        <Table
          ref={r => {
            this.table = r;
          }}
          selectable="false"
          rowCount={sortedPosts.length}
          rowGetter={({ index }) => sortedPosts[index]}
          rowHeight={rowHeight}
          headerHeight={rowHeight}
          height={rowHeight * (sortedPosts.length + 1)}
          width={640}
          gridStyle={{
            willChange: '',
            overflowY: 'auto',
          }}
          sort={this.changeSort}
          sortBy={this.state.sortBy}
          sortDirection={this.state.sortDirection}
        >
          <Column
            label="Post title"
            cellRenderer={({cellData, rowData}) => 
              (<Link to={`/post/${rowData.id}`}>{cellData}</Link>)
            }
            dataKey="title"
            disableSort={false}
            width={180}
            flexGrow={1}
          />
          <Column
            label="Author"
            cellRenderer={({cellData}) => cellData}
            dataKey="author"
            disableSort={false}
            width={120}
          />
          <Column
            label="Category"
            cellRenderer={({cellData}) => cellData}
            dataKey="category"
            disableSort={false}
            width={120}
          />
          <Column
            label="Score"
            cellRenderer={({cellData}) => cellData}
            dataKey="voteScore"
            disableSort={false}
            width={60}
          />
        </Table>
      );
  }
}

PostsTable.propTypes = {
  categories: PropTypes.array,
  posts: PropTypes.array,
};

PostsTable.defaultProps = {
  categories: [],
  posts: [],
};

export default PostsTable;