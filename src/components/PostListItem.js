//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

import PostContentPanel from './PostContentPanel';

//------------------------------------------------------------------------------
// Post List
//------------------------------------------------------------------------------
class PostListItem extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const post = this.props;
    return (
      <ListGroupItem>
        <div className='list-item'>
          <PostContentPanel
            postId={post.id}
            editHref={{
              pathname: `${post.category}/${post.id}`,
              state: { edit: true }
            }}
            />
          <strong>
            <Link to={`${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </strong>
          <span className='list-author'> - by {post.author}</span>
          <span className='list-comments'> ({post.commentCount} comments)</span>
        </div>
      </ListGroupItem>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {
    ...state.posts[ownProps.postId]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);
