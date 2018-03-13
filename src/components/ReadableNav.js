// ------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
// ------------------------------------------------------------------------------

import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {categorySetList} from '../actions/categories';
import {categoryGetList} from '../utils/api';

// ------------------------------------------------------------------------------
// The navigation bar
// ------------------------------------------------------------------------------
class ReadableNav extends Component {

  // ----------------------------------------------------------------------------
  // Get the categories from the data server and store in redux
  // ----------------------------------------------------------------------------
  componentDidMount() {
    categoryGetList().then((categories) => {
      this.props.categorySetList(categories);
    });
  }

  // ----------------------------------------------------------------------------
  // Render the component
  // ----------------------------------------------------------------------------
  render() {
    return (
      <Navbar color="light" className="navbar-light navbar-expand-lg" expand="lg">
      <NavbarBrand href="/" className="mb-0 h1">Readable</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/add-post">Add Post</NavLink>
          </NavItem>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Post Categories
            </DropdownToggle>
            <DropdownMenu >
              {
                this.props.categories.map(({name, path}) => (
                  <DropdownItem key={path} to={'/' + path}>
                  <NavLink href={'/' + path}>{name}</NavLink>
                </DropdownItem>)
              )
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>);
  }
}

// ------------------------------------------------------------------------------
// The redux connection
// ------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {categories: state.categories};
}

function mapDispatchToProps(dispatch) {
  return {
    categorySetList: (data) => dispatch(categorySetList(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableNav));
