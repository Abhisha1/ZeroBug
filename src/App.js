import React from 'react';
import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';
import { withFirebase } from './components/Firebase';
import { AuthUserContext } from './components/Session';

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
import ViewFamily from './pages/ViewFamily';
import ViewArtefact from './pages/ViewArtefact';
import CreateArtifact from './pages/CreateArtifact'
import Grid from '@material-ui/core/Grid';


import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';



let rootStyle = {

  };
const App = () => (
  <Router>
    <Grid container direction="column">
      <Grid item style={{width: '100%'}}>
        <Navigation />
      </Grid>
      <Grid item style={{width: '100%'}}>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.CREATE_FAMILY} component={CreateFamilyPage} />
        <Route path={ROUTES.ARTIFACT} component={Artifact} />
        <Route path={ROUTES.VIEW_FAMILY} component={ViewFamily} />
        <Route path={ROUTES.VIEW_ARTEFACT} component={ViewArtefact} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.CREATE_ARTEFACT} component={CreateArtifact} />
      </Grid>
    </Grid>
  </Router>
);

export default withAuthentication(App);
