import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
      <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
      <Nav.Link href={ROUTES.ACCOUNT}>Account</Nav.Link>
      <Nav.Link href={ROUTES.LANDING}>Landing</Nav.Link>
      <Nav.Link href={ROUTES.SIGN_IN}>Log In</Nav.Link>
      <Nav.Link href={ROUTES.SIGN_UP}>Sign Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default Navigation;
