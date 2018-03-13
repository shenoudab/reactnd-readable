//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import * as api from '../utils/api';
import { commentAdd } from '../actions/comments';

import { makeId } from '../utils/helpers';

//------------------------------------------------------------------------------
// Comment input
//------------------------------------------------------------------------------
class CommentInput extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    body: '',
    author: ''
  };

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
    return (
      <Form>
        <FormGroup>
          <Input value={this.state.author} type='text' placeholder="Write down your name..." onChange={(event) => this.setState({author: event.target.value})} />
        </FormGroup>
        <FormGroup>
          <Input value={this.state.body} type="textarea" placeholder="Write a new comment..." onChange={(event) => this.setState({body: event.target.value})} />
        </FormGroup>
        <Button
          disabled={this.state.author && this.state.body ? false : true}
          onClick={() => {
            const comment = {
              id: makeId(24),
              timestamp: Date.now(),
              body: this.state.body,
              author: this.state.author,
              parentId: this.props.postId
            };
            api.commentAdd(comment)
              .then(() => {
                this.props.commentAdd({...comment, voteScore: 1});
              });
            this.setState({body: '', author: ''});
          }}
          >
          Comment
        </Button>
        </Form>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    commentAdd: (comment) => dispatch(commentAdd(comment))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
