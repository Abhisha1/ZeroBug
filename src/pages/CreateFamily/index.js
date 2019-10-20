import React, { Component } from "react";
import { Form, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import { withFirebase } from '../../components/Firebase'
import { Button, TextField } from "@material-ui/core";
import CustomModal from "../../components/AddModal";
import { HOME } from '../../constants/routes';
import CustomSlider from '../../components/CardSlider';
import UploadFile from "../../components/ImageUpload";
import "./createFamily.scss";
import "../../components/Button/button.scss";
import { withAuthorization } from "../../components/Session";

/**
 * The page which allows users to create a family (easily share artefacts with multiple people at once!)
 */
class CreateFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyName: '',
      familyMembers: [],
      // a modal which displays whether creating the family page was a success or not
      showOutcomeModal: false,
      message: '',
      confirmationTitle: 'Error',
      isExistingFamily: false,
      readyToSubmit: false,
      // the current signed in user
      authUser: null
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * When the component mounts, we get the currently logged on user and store them
   */

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        let authUser = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
        let newMembers = this.state.familyMembers;
        newMembers.push(authUser);
        this.setState({ authUser: authUser, familyMembers: newMembers });
        // User logged in already or has just logged in.
        console.log(user.uid);
      } else {
        this.setState({ authUser: null });
        // User not logged in or has just logged out.
      }
    });
  }
  /**
   * Changes the inputted family name and ensures it does not already exist in the database
   */
  handleChange() {
    return event => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value }, () => {
        let isExistingFamily = this.props.firebase.isExistingFamily(this.state.familyName);
        if (isExistingFamily && this.state.familyName !== isExistingFamily) {
          this.setState({ isExistingFamily: isExistingFamily })
        }
        if (!isExistingFamily && this.state.familyName !== isExistingFamily) {
          this.setState({ isExistingFamily: isExistingFamily })
        }
      });
    }
  }

  /**
   * On submission of the form, the new family is created and stored in the firebase server
   */
  handleSubmit() {
    return event => {

      this.props.firebase.createFamily(this.state.familyMembers, this.state.familyName, this.state.authUser)
        .then(() => {
          this.setState({ message: "You created a new family", confirmationTitle: 'Success', readyToSubmit: true });
        })
        .catch(error => {
          this.setState({ message: "Uh-oh. Something went wrong, try again later" });
        })
      this.setState({ showOutcomeModal: true });
      event.preventDefault();
    }
  }

  /**
   * Handles the data coming from the child modal component which searches for users
   * @param dataFromModal The users matching the search query
   */
  handleModal(dataFromModal) {
    let usersToAdd = this.state.familyMembers;
    // adds the retrieved users to the array of users to add to a family
    // whilst ensuring the user doesn't already exist in the added members
    let duplicate = false;
    for (let i=0; i < this.state.familyMembers.length; i++){
      if(this.state.familyMembers[i].uid === dataFromModal.uid){
        duplicate = true;
      }
    }
    if (!duplicate){
      usersToAdd.push(dataFromModal);
    }
    this.setState({
      familyMembers: usersToAdd
    });
  }

  searchForUsers(firebase, familyMemberName, modalState) {
    firebase.searchUsers(familyMemberName, modalState)
  }

  /**
   * Renders the create family form onto the webpage
   */
  render() {
    // An error popover that is displayed when a family already exists under this name
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Family name error</Popover.Title>
        <Popover.Content>
          This family already exists! Please change the family group's name.
        </Popover.Content>
      </Popover>
    )



    // ensures a family has a name and family members
    let invalid = (this.state.familyMembers.length === 0)
    return (
      <div id="create-family-page">
        <h1 id="create-family-heading">Create a new family</h1>

        {/* An avatar for the family */}
        <UploadFile dbLocation="familyImages/" isCreate={true} name={this.state.familyName} readyToSubmit={this.state.readyToSubmit} />

        {/* The form for creating a family */}
        <Form onSubmit={this.handleSubmit()} id="new-family-form">

          {/* Displays popover is family exists */}
          {this.state.isExistingFamily ?
            <OverlayTrigger placement="right" overlay={popover}>
              <TextField margin="normal" variant="outlined" label="Family Name" autoFocus required fullWidth name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange()} />
            </OverlayTrigger>
            : <TextField margin="normal" variant="outlined" label="Family Name" autoFocus required fullWidth name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange()} />
        }
          {/* Renders the members that have been added to the family so far */}
          <CustomSlider cards={this.state.familyMembers}></CustomSlider>

          {/* Handles the functionality to add users to a family using a custom modal */}
          <div id="family-buttons">
            <Form.Group controlId="validationFormikUsername">
              <CustomModal action={this.handleModal} title="Users" search={this.searchForUsers}></CustomModal>
            </Form.Group>
            <Button id="create-family-button" variant="outlined" disabled={this.state.isExistingFamily || invalid} type="submit" value="Create">Create</Button>
          </div>
        </Form>

        {/* A modal that shows whether the action was successful or not successful in creating a family */}
        <Modal show={this.state.showOutcomeModal} onHide={() => window.location.assign(HOME)}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.confirmationTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.showOutcomeModal && this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" id="confirmationClose" onClick={() => window.location.assign(HOME)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

const CreateFamilyForm = withFirebase(CreateFamily);
const CreateFamilyPage = () => (
  <CreateFamilyForm></CreateFamilyForm>
);

// Ensures only an authorised user can create families
const condition = authUser => !!authUser;
export default withAuthorization(condition)(CreateFamilyPage);
