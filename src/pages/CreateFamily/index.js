import React, { Component } from "react";
import "../../components/Button/button.scss";
import {Form, InputGroup, FormControl, Button} from "react-bootstrap";
import {MdGroupAdd} from "react-icons/md"
import "./createFamily.scss";
import CustomModal from "../../components/Modal";
class CreateFamilyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {familyName: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    
                    <CustomModal></CustomModal>
                    </Form.Group>
                    <button variant="primary" type="submit" value="Create">Create</button>
                </Form>
            </div>
        );
      }

}
export default CreateFamilyPage;