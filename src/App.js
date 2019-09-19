import React, {Component} from 'react';
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
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';

import * as ROUTES from './constants/routes';


class App extends Component{
    constructor(props) {
        super(props);
    this.state = {
        authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null});
        });
    }

    componentWillUnmount() {
    this.listener();
  }


    render(){
        return(
            <AuthUserContext.Provider value={this.state.authUser}>
                <Router>
                  <div>
                    <Navigation authUser={this.state.authUser} />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
                    <Route path={ROUTES.HOME} component={HomePage} />
                    {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
                    {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
                  </div>
                </Router>
            </AuthUserContext.Provider>
        );
    }
}

export default withFirebase(App);
