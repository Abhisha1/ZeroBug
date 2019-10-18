import React from 'react';
import { AuthUserContext } from '../../components/Session'
import SignOutButton from '../../components/SignOut';
import { Navbar, Nav } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { IoMdPeople, IoMdPerson, IoMdHome } from "react-icons/io"
import './navigation.scss';
import logo from "../../assets/templogo.png";
import Avatar from '@material-ui/core/Avatar';

/**
 * The Navigation bar that is used on website that renders differently depending on whether
 * the user is signed in and authorised, or if it is not
 */
const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light" id="nav-bar">
    <a href={ROUTES.LANDING} className="navbar-left" id="homepage-logo"><img src={logo} id="logo-image" alt="Logo"></img></a>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <AuthUserContext.Consumer>
        {/* Renders the approaprriate links depending on whether user is signed in/authorised or not */}
        {authUser => 
          authUser ? <NavigationAuth user={authUser}/> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </Navbar.Collapse>
  </Navbar>
);
/**
 * The Navigation bar links when the user is authorised/ signed into their acount
 */
const NavigationAuth = ( user ) => {
  return <Nav className="ml-auto">
    <Nav.Link href={ROUTES.HOME}><IoMdHome size={30} alt="Home"></IoMdHome></Nav.Link>
    <Nav.Link href={ROUTES.ACCOUNT}><Avatar alt="Remy Sharp" src={user.user.photoURL}>U</Avatar></Nav.Link>
    <Nav.Link href={ROUTES.CREATE_FAMILY}><IoMdPeople size={30} alt="Create Family"></IoMdPeople></Nav.Link>
    <SignOutButton />
  </Nav>
};
/**
 * The Navigation bar links when the user is NOT authorised/signed into their acount
 */
const NavigationNonAuth = () => (
  <Nav className="ml-auto">
    <Nav.Link href={ROUTES.SIGN_IN}>Log In</Nav.Link>
    <Nav.Link href={ROUTES.SIGN_UP}>Sign Up</Nav.Link>
  </Nav>
);


export default Navigation;
