import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './Dropdown.scss';

class DropdownComponent extends React.Component {
  state = {
    isOpen: false,
  }

  static propTypes = {
    getNewestPosts: PropTypes.func.isRequired,
    getOldestPosts: PropTypes.func.isRequired,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="DropdownComponent ml-4">
        <Dropdown direction="right" isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Select Order
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.props.getNewestPosts}>Newest</DropdownItem>
            <DropdownItem onClick={this.props.getOldestPosts}>Oldest</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownComponent;
