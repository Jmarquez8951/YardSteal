import React from 'react';
import { NavLink as RRNavlink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import authData from '../../../helpers/data/authData';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logMeOut = (e) => {
    e.preventDefault();
    authData.logoutUser();
  }

  render() {
    const { authed } = this.props;

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
            {authed
              ? <NavItem>
                  <NavLink className="logout" onClick={this.logMeOut}>Logout</NavLink>
                </NavItem>
              : ''
            }
          </Nav>
        </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
