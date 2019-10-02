import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import "../Button/button.scss";
import { Form, Modal } from 'react-bootstrap';
import "./signinform.scss";
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  showModal: false
};

/**
 * The form for signing into an existing account
 */

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   * Closes the modal/hides the modal
   */
  handleClose() {
    this.setState({ showModal: false });
  }
  /**
   * Sends the user entered data from database and logs the user if details are correct
   * @param event An event triggered by the submitting of the form 
   */
  onSubmit = event => {
    const { email, password } = this.state;
    // calls authorisation to check email and password and whether it matches records in database
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      // Shows the error pop up when details are incorrect
      .catch(error => {
        this.setState({ error });
        this.setState({ showModal: true });
      });
    event.preventDefault();
  };
  /**
   * Updates the specified value to new input
   * @param event The event of the value being changed by user input
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * Renders the sign in form on the webpage
   */
  render() {
    const { email, password, error } = this.state;
    // Ensures that the password and email is not empty when trying to log in
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
        {/* makes submit button submittable only when email and password has a value */}
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