// ------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
// ------------------------------------------------------------------------------

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Col,
  ListGroup,
  Card
} from 'reactstrap';
import sortBy from 'sort-by';

import {categoryExists} from '../utils/helpers';
import {postGetList} from '../utils/api';
import {postSetList} from '../actions/posts';

import PostListItem from './PostListItem';
import SortSettings from './SortSettings';
import WrongRoute from './WrongRoute';

// ------------------------------------------------------------------------------
// Post List
// ------------------------------------------------------------------------------
class PostList extends Component {
  // ----------------------------------------------------------------------------
  // Mount the component
  // ----------------------------------------------------------------------------
  componentDidMount() {
    postGetList(this.props.match.params.category).then(data => this.props.postSetList(data));
  }

  // ----------------------------------------------------------------------------
  // Update the state if props changed
  // ----------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    const thisCategory = this.props.match.params.category;
    const nextCategory = nextProps.match.params.category;
    if (thisCategory !== nextCategory)
      postGetList(nextCategory).then(data => this.props.postSetList(data));
    }

  // ----------------------------------------------------------------------------
  // Render the component
  // ----------------------------------------------------------------------------
  render() {
    // --------------------------------------------------------------------------
    // Check the route
    // --------------------------------------------------------------------------
    const {params} = this.props.match;
    var ok = true;

    if (params.category && this.props.categories.length && categoryExists(params.category, this.props.categories) === false)
      ok = false;

    if (!ok)
      return (<WrongRoute/>);

    // --------------------------------------------------------------------------
    // Figure out the title
    // --------------------------------------------------------------------------
    const title = params.hasOwnProperty('category')
      ? 'Posts for category "' + params.category + '":'
      : 'All Posts:';

    // --------------------------------------------------------------------------
    // Figure out the shape of the list
    // --------------------------------------------------------------------------
    var list = (<Card>
      <div className='list-no-posts'>No posts in this category.</div>
    </Card>);

    if (this.props.posts.length)
      list = (<ListGroup>
        {this.props.posts.map(post => (<PostListItem key={post.id} postId={post.id}/>))}
      </ListGroup>);

    // --------------------------------------------------------------------------
    // Return the final component
    // --------------------------------------------------------------------------
    return (<Col>
      <h2>{title}</h2>
      <SortSettings type='posts'/> {list}
    </Col>);
  }
}

// ------------------------------------------------------------------------------
// The redux connection
// ------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    ...state,
    posts: Object.keys(state.posts).map((key) => {
      return state.posts[key];
    }).sort(sortBy(`-${state.settings.sortKey.posts}`))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postSetList: (data) => dispatch(postSetList(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
