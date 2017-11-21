import React from 'react';
import PropTypes from 'prop-types';

const PostsTableRow = (
  {
    columns,
    className,
    rowData,
    style,
  }
) => 
  <div
    className={className}
    key={rowData.id}
    role="row"
    style={style}
  >
    {columns}
  </div>;

PostsTableRow.propTypes = {
  columns: PropTypes.array,
  className: PropTypes.string,
  rowData: PropTypes.object,
  style: PropTypes.object,
};

PostsTableRow.defaultProps = {
  className: '',
  columns: {},
  rowData: {},
  style: {},
};

export default PostsTableRow;
