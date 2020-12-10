import React from 'react';
import { NavLink as RRNavlink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="MyNavbar">
        <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">YardSteal</NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavlink} to={'/new-post'}>Create Post</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to={'/my-posts'}>My Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to={'/account'}>Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to={'/bookmarks'}>Bookmarks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
