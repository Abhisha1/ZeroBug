import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import {IoMdPeople, IoMdPerson, IoMdHome} from "react-icons/io"
import './navigation.scss';
import logo from "../../assets/templogo.png";

const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light" id="nav-bar">
  <a href={ROUTES.LANDING} className="navbar-left" alt-text="Homepage" id="homepage-logo"><img src={logo} id="logo-image"></img></a>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <NavDropdown title={<IoMdPerson size={30}></IoMdPerson>} id="basic-nav-dropdown">
        <NavDropdown.Item href={ROUTES.ACCOUNT}>Account</NavDropdown.Item>
        <NavDropdown.Item href={ROUTES.SIGN_IN}>Log In</NavDropdown.Item>
        <NavDropdown.Item href={ROUTES.SIGN_UP}>Sign Up</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href={ROUTES.HOME}><IoMdHome size={30}></IoMdHome></Nav.Link>
      <Nav.Link href={ROUTES.CREATE_FAMILY}><IoMdPeople size={30}></IoMdPeople></Nav.Link>
      <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
      <Nav.Link href={ROUTES.ARTIFACT}>Artifact</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default Navigation;
