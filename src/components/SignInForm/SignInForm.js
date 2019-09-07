import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import "../Button/button.scss";
import {Form, Modal} from 'react-bootstrap';
import "./signinform.scss";
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  showModal: false
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(){
    this.setState({showModal: false});
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
        this.setState({showModal: true});
        console.log(this.state.showModal);
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Form onSubmit={this.onSubmit} id="sign-in-form">
        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Enter email"
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
        ></Form.Control>
        </Form.Group>
        <button variant="primary" disabled={isInvalid} type="submit" value="Sign In">Sign In
        </button>
        <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title> Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error && error.message}</Modal.Body>
          <Modal.Footer>
            <button variant="primary" onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInForm;