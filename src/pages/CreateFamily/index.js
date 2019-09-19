import React, { Component } from "react";
import "../../components/Button/button.scss";
import {Form, Modal} from "react-bootstrap";
import {MdGroupAdd, MdPersonPinCircle} from "react-icons/md"
import "./createFamily.scss";
import {FirebaseContext} from "../../components/Firebase";
import CustomModal from "../../components/Modal";
import {HOME} from '../../constants/routes';
import * as MESSAGES from '../../constants/messages';
class CreateFamilyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {familyName: '', familyMembers: [], showOutcomeModal: false, message: ''};
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
      }
    
      handleSubmit(firebase){
        return event => {
          //admin will be changed after session handling to group creator

          let createFamilyResult = firebase.createFamily(this.state.familyMembers, this.state.familyName, this.state.familyMembers[0])
          .then(() => {
            this.setState({message: "You successfully created a new family"});
          })
          .catch(error => {
            this.setState({message: "Uh-oh. Something went wrong, try again later"});
          })
          this.setState({showOutcomeModal: true});
          event.preventDefault();
        }
      }

      handleModal(dataFromModal){
        console.log(dataFromModal);
        console.log(dataFromModal.values());
        let usersToAdd = this.state.familyMembers;
        console.log("users existing   "+ usersToAdd)
        dataFromModal.map(item => {
          if(this.state.familyMembers.indexOf(item) === -1){
            usersToAdd.push(item);
          }
        })
        console.log("users to add   "+ usersToAdd)
        this.setState({
          familyMembers: usersToAdd
        });
      }
    
      render() {
        return (
            <div>
                <h1 id="create-family-heading">Create a new family</h1>
                <MdGroupAdd size={400} id="family-avatar"></MdGroupAdd>
                <FirebaseContext.Consumer>
                  {firebase => 
                <Form onSubmit={this.handleSubmit(firebase)} id="new-family-form">
                <Form.Label> Family Name </Form.Label>
                    <Form.Control name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange} />
                    <Form.Group controlId="validationFormikUsername">
                    <Form.Label>Add Members</Form.Label>
                    
                    <CustomModal action={this.handleModal}></CustomModal>
                    </Form.Group>
                    <button variant="primary" type="submit" value="Create">Create</button>
                </Form>
                  }
                </FirebaseContext.Consumer>
                <div>
                  {this.state.familyMembers.map(item => (
                    <div key={item.name}>
                      <MdPersonPinCircle></MdPersonPinCircle>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
                <Modal show={this.state.showOutcomeModal} onHide={() => this.props.history.push(HOME)}>
                  <Modal.Header closeButton>
                    <Modal.Title> Error</Modal.Title>
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