import React from 'react';
import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import Navigation from './pages/Navigation'
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import CreateFamilyPage from './pages/CreateFamily';
import Artifact from './pages/Artifact';
import AccountPage from './pages/Account';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AdminPage from './pages/Admin';

import * as ROUTES from './constants/routes';



const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.CREATE_FAMILY} component={CreateFamilyPage} />
      <Route path={ROUTES.ARTIFACT} component={Artifact} />
      {<Route path={ROUTES.ACCOUNT} component={AccountPage} />}
      {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
      {/* <Route path={ROUTES.HOME} component={HomePage} /> */}
      {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
    </div>
  </Router>
);

export default App;
