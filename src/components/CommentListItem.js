//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Button } from 'reactstrap';

import * as api from '../utils/api';
import {
  commentEdit, commentUpVote, commentDownVote, commentDelete
} from '../actions/comments';

import ContentPanel from './ContentPanel';

//------------------------------------------------------------------------------
// Comment List Item
//------------------------------------------------------------------------------
class CommentListItem extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    editing: false,
    body: ''
  };

  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    commentId: PropTypes.string.isRequired
  };

  //----------------------------------------------------------------------------
  // Mount the component
  //----------------------------------------------------------------------------
  componentDidMount() {
    this.setState({
      body: this.props.body
    });
  }

  //----------------------------------------------------------------------------
  // Update the state if props changed
  //----------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    this.setState({
      body: nextProps.body
    });
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Viewing
    //--------------------------------------------------------------------------
    if(!this.state.editing) {
      return (
        <div>
          <div>
            <ContentPanel
              itemId={this.props.id}
              score={this.props.voteScore}
              onUpVote={() => {
                api.commentVote(this.props.id, true)
                  .then(() => this.props.commentUpVote(this.props.id));
              }}
              onDownVote={() => {
                api.commentVote(this.props.id, false)
                  .then(() => this.props.commentDownVote(this.props.id));
              }}
              onDelete={() => {
                api.commentDelete(this.props.id)
                  .then(() => this.props.commentDelete(this.props.id));
              }}
              onEdit={() => this.setState({editing: true})}
              />
            <strong>{this.props.author}</strong> wrote:
          </div>
          <div>
            {this.props.body}
          </div>
        </div>
      );
    }
    //--------------------------------------------------------------------------
    // Editing
    //--------------------------------------------------------------------------
    else {
      return (
        <Form>
        <FormGroup>
          <Input value={this.state.body} type="textarea" onChange={(event) => this.setState({body: event.target.value})} />
        </FormGroup>
        <Button
          disabled={this.state.body ? false : true}
          onClick={() => {
            const now = Date.now();
            const body = this.state.body;
            api.commentEdit(this.props.id, now, body)
              .then(() => {
                this.setState({editing: false});
                this.props.commentEdit(this.props.id, now, body);
              });
          }}>
          &nbsp;
          Save
        </Button>
        </Form>
      );
    }
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {
    ...state.comments[ownProps.commentId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentEdit: (id, timestamp, body) => {
      dispatch(commentEdit(id, timestamp, body));
    },
    commentUpVote: (id) => dispatch(commentUpVote(id)),
    commentDownVote: (id) => dispatch(commentDownVote(id)),
    commentDelete: (id) => dispatch(commentDelete(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
