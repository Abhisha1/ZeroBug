import React, { Component } from "react";
import "../../components/Button/button.scss";
import {Form, Modal, Popover, OverlayTrigger} from "react-bootstrap";
import {MdGroupAdd} from "react-icons/md"
import "./createFamily.scss";
import {FirebaseContext} from "../../components/Firebase";
import CustomModal from "../../components/AddUserModal";
import {HOME} from '../../constants/routes';
import CustomSlider from '../../components/CardSlider';
import UploadFile from "../../components/ImageUpload";
class CreateFamilyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {familyName: '',
            familyMembers: [],
            showOutcomeModal: false,
            message: '',
            confirmationTitle:'Error',
            isExistingFamily: false,
            readyToSubmit: false};
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(firebase) {
        return event => {
          const target = event.target;
          const value = target.value;
          const name = target.name;
          this.setState({[name]: value}, () => {
            let isExistingFamily = firebase.isExistingFamily(this.state.familyName);
            if (isExistingFamily && this.state.familyName !== isExistingFamily){
              this.setState({isExistingFamily: isExistingFamily})
            }
            if (!isExistingFamily && this.state.familyName !== isExistingFamily){
              this.setState({isExistingFamily: isExistingFamily})
            }
          });  
        }
      }
    
      handleSubmit(firebase){
        return event => {
          //admin will be changed after session handling to group creator

          firebase.createFamily(this.state.familyMembers, this.state.familyName, this.state.familyMembers[0])
          .then(() => {
            this.setState({message: "You created a new family", confirmationTitle: 'Success', readyToSubmit: true});
          })
          .catch(error => {
            this.setState({message: "Uh-oh. Something went wrong, try again later"});
          })
          this.setState({showOutcomeModal: true});
          event.preventDefault();
        }
      }

      handleModal(dataFromModal){
        let usersToAdd = this.state.familyMembers;
        if(this.state.familyMembers.indexOf(dataFromModal) === -1){
            usersToAdd.push(dataFromModal);
        }
        this.setState({
          familyMembers: usersToAdd
        });
      }
      render() {
        const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Family name error</Popover.Title>
          <Popover.Content>
            This family already exists! Please change the family group's name.
          </Popover.Content>                    
        </Popover>
        )
        let invalid = (this.state.familyName === '' || this.state.familyMembers.length === 0)
        return (
            <div id="create-family-page">
                <h1 id="create-family-heading">Create a new family</h1>
                <UploadFile dbLocation="familyImages/" isCreate={true} name={this.state.familyName} readyToSubmit={this.state.readyToSubmit}/>
                <FirebaseContext.Consumer>
                  {firebase => 
                <Form onSubmit={this.handleSubmit(firebase)} id="new-family-form">
                <Form.Label> Family Name </Form.Label>
                {this.state.isExistingFamily ?
                <OverlayTrigger placement="right" overlay={popover}>
                <Form.Control name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange(firebase)} />
                </OverlayTrigger>
                :<Form.Control name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange(firebase)} />
                }
                    <div id="family-buttons">
                    <Form.Group controlId="validationFormikUsername">
                    <CustomModal action={this.handleModal}></CustomModal>
                    </Form.Group>
                    <button id="create-family-button" variant="primary" disabled={this.state.isExistingFamily || invalid} type="submit" value="Create">Create</button>
                    </div>
                </Form>
                  }
                </FirebaseContext.Consumer>
                <CustomSlider cards={this.state.familyMembers}></CustomSlider>
                <Modal show={this.state.showOutcomeModal} onHide={() => this.props.history.push(HOME)}>
                  <Modal.Header closeButton>
                    <Modal.Title> {this.state.confirmationTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{this.state.showOutcomeModal && this.state.message}</Modal.Body>
                  <Modal.Footer>
                    <button variant="primary" onClick={() => this.props.history.push(HOME)}>Close</button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
      }

}
export default CreateFamilyPage;