import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { FaUser, FaHome } from "react-icons/fa"; 
import './navigation.scss';

const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href={ROUTES.HOME}><FaHome></FaHome></Nav.Link>
      <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
      <NavDropdown title={<FaUser></FaUser>} id="basic-nav-dropdown">
        <NavDropdown.Item href={ROUTES.ACCOUNT}>Account</NavDropdown.Item>
        <NavDropdown.Item href={ROUTES.SIGN_IN}>Log In</NavDropdown.Item>
        <NavDropdown.Item href={ROUTES.SIGN_UP}>Sign Up</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default Navigation;
