import React, { Component } from "react";
import "../../components/Button/button.scss";
import {Form, InputGroup, FormControl, Button} from "react-bootstrap";
import {MdGroupAdd} from "react-icons/md"
import "./createFamily.scss";
import CustomModal from "../../components/Modal";
class CreateFamilyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {familyName: '', displayModal: false, familyMember: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModal = this.handleModal.bind(this);
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
      }

      handleModal(){
          this.setState({displayModal: true});
      }
    
      render() {
        return (
            <div>
                <h1 id="create-family-heading">Create a new family</h1>
                <MdGroupAdd size={400} id="family-avatar"></MdGroupAdd>
                <Form onSubmit={this.handleSubmit} id="new-family-form">
                <Form.Label> Family Name </Form.Label>
                    <Form.Control name="familyName" type="text" value={this.state.familyName} onChange={this.handleChange} />
                    <Form.Group controlId="validationFormikUsername">
                    <Form.Label>Add Members</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="User"
                        aria-label="Users"
                        name="familyMember"
                        value={this.state.familyMember}
                        onChange={this.handleChange}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.handleModal} id="add-user-button">Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.displayModal &&<CustomModal></CustomModal>}
                    </Form.Group>
                    <button variant="primary" type="submit" value="Create">Create</button>
                </Form>
            </div>
        );
      }

}
export default CreateFamilyPage;