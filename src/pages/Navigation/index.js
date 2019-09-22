import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../components/Session'
import SignOutButton from '../../components/SignOut';
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
  <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </Navbar.Collapse>
</Navbar>
);

const NavigationAuth = () => (
  <Nav className="ml-auto">
      <Nav.Link href={ROUTES.HOME}><IoMdHome size={30}></IoMdHome></Nav.Link>
      <Nav.Link href={ROUTES.ACCOUNT}><IoMdPerson size={30}></IoMdPerson></Nav.Link>
      <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
      <SignOutButton/>
    </Nav>
);

const NavigationNonAuth = () => (
      <Nav className="ml-auto">
        <Nav.Link href={ROUTES.SIGN_IN}>Log In</Nav.Link>
        <Nav.Link href={ROUTES.SIGN_UP}>Sign Up</Nav.Link>
    </Nav>
);


export default Navigation;
