// ------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 30.12.2017
// ------------------------------------------------------------------------------

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
} from 'reactstrap';

import * as api from '../utils/api';
import {postUpdate, postEdit} from '../actions/posts';

import PostContentPanel from './PostContentPanel';
import CommentList from './CommentList';
import WrongRoute from './WrongRoute';
import Loading from './Loading';

// ------------------------------------------------------------------------------
// Post View
// ------------------------------------------------------------------------------
class PostView extends Component {
  // ----------------------------------------------------------------------------
  // The state
  // ----------------------------------------------------------------------------
  state = {
    editing: false,
    fetchError: false,
    title: '',
    author: ''
  }

  // ----------------------------------------------------------------------------
  // Mount the component
  // ----------------------------------------------------------------------------
  componentDidMount() {
    const edit = this.props.location.state && this.props.location.state.edit
      ? true
      : false;

    api.postGet(this.props.match.params.postId).then(data => {
      this.props.postUpdate(data);
      this.setState({editing: edit});
    }).catch(() => this.setState({fetchError: true}));

    this.setState({title: this.props.title, body: this.props.body});
  }

  // ----------------------------------------------------------------------------
  // Update the state if props changed
  // ----------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    const thisPostId = this.props.match.params.postId;
    const nextPostId = nextProps.match.params.postId;
    if (thisPostId !== nextPostId)
      api.postGet(nextPostId).then(data => this.props.postUpdate(data)).catch(() => this.setState({fetchError: true}));

    this.setState({title: nextProps.title, body: nextProps.body});
  }

  // ----------------------------------------------------------------------------
  // Render the component
  // ----------------------------------------------------------------------------
  render() {
    // --------------------------------------------------------------------------
    // Check if we can render the post
    // --------------------------------------------------------------------------
    if (!('id' in this.props)) {
      if (this.state.fetchError)
        return (<WrongRoute/>);
      else
        return (<Loading/>);
      }

    var header = null;
    var body = null;

    // --------------------------------------------------------------------------
    // Edition
    // --------------------------------------------------------------------------
    if (this.state.editing) {
      // ------------------------------------------------------------------------
      // Edit header
      // ------------------------------------------------------------------------
      header = (<div>Edit Post</div>);

      // ------------------------------------------------------------------------
      // Edit body
      // ------------------------------------------------------------------------
      body = (<Form>
        <FormGroup>
          <Input type="text" name="title" id="Title" onChange={(event) => {
              this.setState({title: event.target.value});
            }} value={this.state.title}/>
        </FormGroup>
        <FormGroup>
          <Input type="textarea" name="body" id="body" style={{
              height: 200
            }} onChange={(event) => this.setState({body: event.target.value})} value={this.state.body}/>
        </FormGroup>
        <Button disabled={this.state.body && this.state.title
            ? false
            : true} onClick={() => {
            const title = this.state.title;
            const body = this.state.body;
            const id = this.props.id;
            api.postEdit(id, title, body).then(() => {
              this.props.postEdit(id, title, body);
              this.setState({editing: false});
            });
          }}>
          Save
        </Button>
      </Form>);
      // --------------------------------------------------------------------------
      // Viewing
      // --------------------------------------------------------------------------
    } else {
      const category = this.props.match.params.category;
      header = (
        <div className='post-header'>
        <PostContentPanel postId={this.props.id} onEdit={() => this.setState({editing: true})} afterDelete={() => this.props.history.push(`/${category}`)}/>
        <h2>{this.props.title} <span className='list-author'> - by {this.props.author}</span></h2>
      </div>);
      body = this.props.body;
    }

    // --------------------------------------------------------------------------
    // Render
    // --------------------------------------------------------------------------
    return (<Col>
          {header}
          {body}
          <hr/>
          <CommentList postId={this.props.id}/>
    </Col>);
  }
}

// ------------------------------------------------------------------------------
// The redux connection
// ------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.postId;
  if (postId in state.posts)
    return {
      ...state.posts[postId]
    };
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    postUpdate: (data) => dispatch(postUpdate(data)),
    postEdit: (id, title, body) => dispatch(postEdit(id, title, body))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
