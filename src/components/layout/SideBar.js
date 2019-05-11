import React, { Component } from 'react';
import SideBarItem from './SideBarItem.js';
import { Nav, Col, NavbarBrand, Navbar } from 'shards-react';

class SideBar extends Component {
  render() {
    return (
      <Col
        tag="aside"
        className="main-sidebar px-0 col-12"
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href='/'
            style={{ lineHeight: "35px" }}
          >
            <div className="d-table m-auto">
              <span className="d-none d-md-inline ml-1">
                Gradus
              </span>
            </div>
          </NavbarBrand>
        </Navbar>
        <Nav className="nav--no-borders flex-column">
          <SideBarItem to='/class' name='Class' />
          <SideBarItem to='/assignment' name='Assignments' />
          <SideBarItem to='/student' name='Students' />
          <SideBarItem to='/settings' name='Settings' />
        </Nav>
      </Col>
    );
  }
}

export default SideBar;
