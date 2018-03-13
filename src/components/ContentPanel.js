// ------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
// ------------------------------------------------------------------------------

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';
import {ButtonGroup, Button, ButtonToolbar} from 'reactstrap';
import ThumbsUp from 'react-icons/lib/ti/thumbs-up';
import ThumbsDown from 'react-icons/lib/ti/thumbs-down';
import Edit from 'react-icons/lib/ti/edit';
import Delete from 'react-icons/lib/ti/delete';

// ------------------------------------------------------------------------------
// A bootstrap button that works well with react router
// ------------------------------------------------------------------------------
function RoutedButton(props) {
  const button = (<Button outline color="secondary" onClick={() => {
      if (props.onClick)
        props.onClick();
      }}>
    <Edit size={30}/>
  </Button>);
  if (!props.href)
    return button;

  return (<LinkContainer to={props.href}>
    {button}
  </LinkContainer>);
}

// ------------------------------------------------------------------------------
// Sort Settings
// ------------------------------------------------------------------------------
class ContentPanel extends Component {
  // ----------------------------------------------------------------------------
  // Property types
  // ----------------------------------------------------------------------------
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    editHref: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  // ----------------------------------------------------------------------------
  // Render the component
  // ----------------------------------------------------------------------------
  render() {
    const { score } = this.props;

    // --------------------------------------------------------------------------
    // Score buttone
    // --------------------------------------------------------------------------
    const scoreButtons = (<ButtonGroup className="mr-2">
      <Button outline color="secondary" onClick={() => {
          this.props.onUpVote();
        }}>
        <ThumbsUp size={30}/>
      </Button>

      <Button outline color="secondary" disabled>
        {score}
      </Button>

      <Button outline color="secondary" onClick={() => {
          this.props.onDownVote();
        }}>
        <ThumbsDown size={30}/>
      </Button>
    </ButtonGroup>);

    // --------------------------------------------------------------------------
    // Control buttons - edit and delete
    // --------------------------------------------------------------------------
    const controlButtons = (<ButtonGroup>
      <RoutedButton itemId={this.props.itemId} name='edit' href={this.props.editHref} onClick={this.props.onEdit}/>

      <Button outline color="secondary" onClick={() => {
          this.props.onDelete();
        }}>
        <Delete size={30}/>
      </Button>

    </ButtonGroup>);

    // --------------------------------------------------------------------------
    // Render the content
    // --------------------------------------------------------------------------
    return (<div className='content-panel'>
      <ButtonToolbar>
        {scoreButtons}
        {controlButtons}
      </ButtonToolbar>
    </div>);
  }
}

export default ContentPanel;
