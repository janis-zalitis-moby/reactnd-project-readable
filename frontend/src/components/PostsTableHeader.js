import React from 'react';
import PropTypes from 'prop-types';

const PostsTableHeader = (
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

PostsTableHeader.propTypes = {
  columns: PropTypes.array,
  className: PropTypes.string,
  rowData: PropTypes.object,
  style: PropTypes.object,
};

PostsTableHeader.defaultProps = {
  className: '',
  columns: {},
  rowData: {},
  style: {},
};

export default PostsTableHeader;
