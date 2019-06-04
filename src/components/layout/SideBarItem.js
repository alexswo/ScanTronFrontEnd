import React from 'react';
import PropTypes from 'prop-types';

import { NavLink as RouteNavLink } from 'react-router-dom';
import { NavItem, NavLink } from 'shards-react';

const SideBarItem = (props) => (
  <NavItem>
    <NavLink tag={RouteNavLink} to={props.to} onClick={props.handleClick}>
      {props.name && <span>{props.name}</span>}
    </NavLink>
  </NavItem>
);

SideBarItem.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
};

export default SideBarItem;
