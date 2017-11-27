import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import PlusIcon from 'material-ui/svg-icons/content/add';
import MinusIcon from 'material-ui/svg-icons/content/remove';

import {
  Table,
  Column,
  SortDirection,
} from 'react-virtualized';


const rowHeight = 40;

const iconStyle = {
  cursor: 'pointer',
  float: 'left',
}

/**
 * Renders posts table
 */
class PostsTable extends Component {
  state = {
    sortBy: 'voteScore',
    sortDirection: SortDirection.ASC,
    sortedPosts: [],
  };

  componentWillReceiveProps = nextProps => {
    const { posts } = nextProps;

    if (posts.length) {
      this.setState({
        sortedPosts: this.sortPosts(posts),
      });
    } else {
      this.setState({
        sortedPosts: [],
      });
    }
  }

  /**
   * handles change in sort direction or sort key/field
   * @param  {string} sortBy        key/field to sort by
   * @param  {string} sortDirection DESC/ASC
   */
  changeSort = ({ sortBy, sortDirection }) => {
    this.setState({
      sortBy,
      sortDirection: (
        this.state.sortBy !== sortBy ? SortDirection.ASC
          : (sortDirection !== SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC)
      ),
    }, () => {
      this.setState({ sortedPosts: this.sortPosts(this.props.posts) });
    });
  }

  /**
   * sorting method
   * @param  {array} posts posts to sort
   * @return {array}       sorted posts
   */
  sortPosts = posts => {
    const sortedPosts = posts.sort((a, b) => a[this.state.sortBy] < b[this.state.sortBy]);

    if (this.state.sortDirection === SortDirection.DESC) {
      sortedPosts.reverse();
    }

    return sortedPosts;
  }

  /**
   * Render a single row informing when there are no posts
   * NOTE: does not work likely due to an issue in the library, wasn't able to find mistakes in application
   * @return {node} row to render when no posts were found
   */
  noRowsRenderer = () =>
    <div style={{ width: '100%', textAlign: 'center' }}>No posts found</div>;

  render() {
    const { onNewPost, category, upVote, downVote, onEdit, onDelete } = this.props;
    const { sortedPosts } = this.state;

    return (
        <Card>
          <CardTitle
            title={(category || 'All posts')}
            subtitle={(category ? <Link to="/">Back to all posts</Link> : null)}
          />
          <Divider />
          <CardText>
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
              noRowsRenderer={this.noRowsRenderer}
            >
              <Column
                label="Post title"
                cellRenderer={({ cellData, rowData }) =>
                  (<Link to={`/${rowData.category}/${rowData.id}`}>{cellData}</Link>)
                }
                dataKey="title"
                disableSort={false}
                width={180}
                flexGrow={1}
              />
              <Column
                label="Author"
                cellRenderer={({ cellData }) => cellData}
                dataKey="author"
                disableSort={false}
                width={70}
              />
              <Column
                label="Category"
                cellRenderer={({ cellData }) => cellData}
                dataKey="category"
                disableSort={false}
                width={70}
              />
              <Column
                label="Comments"
                cellRenderer={({ cellData }) => cellData}
                dataKey="commentCount"
                disableSort={false}
                width={80}
              />
              <Column
                label="Score"
                cellRenderer={({ cellData, rowData }) => (
                  <span style={{ height: 24, display: 'inline-block' }}>
                    <span style={{ float: 'left', display: 'inline-block', height: 24, lineHeight: '24px' }}>{cellData}</span>
                    <PlusIcon onClick={() => upVote(rowData.id)} style={iconStyle} />
                    <MinusIcon onClick={() => downVote(rowData.id)} style={iconStyle} />
                  </span>
                )}
                dataKey="voteScore"
                disableSort={false}
                width={80}
              />
              <Column
                label="Actions"
                cellRenderer={({ cellData, rowData }) => (
                  <span>
                    <EditIcon onClick={() => onEdit(rowData)} style={iconStyle} />
                    <DeleteIcon onClick={() => onDelete(rowData)} style={iconStyle} />
                  </span>
                )}
                dataKey=""
                disableSort
                width={60}
              />
            </Table>
          </CardText>
          <Divider />
          <CardActions style={{ textAlign: 'right' }}>
            <FlatButton label="Add New Post" onClick={onNewPost} />
          </CardActions>
        </Card>
    );
  }
}

PostsTable.propTypes = {
  categories: PropTypes.array,
  posts: PropTypes.array,
  onNewPost: PropTypes.func,
  category: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

PostsTable.defaultProps = {
  categories: [],
  posts: [],
  onNewPost: null,
  category: null,
  upVote: null,
  downVote: null,
  onEdit: null,
  onDelete: null
};

export default PostsTable;
