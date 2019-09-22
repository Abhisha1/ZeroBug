import React, { Component } from "react";
import {Modal} from "react-bootstrap";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {FirebaseContext} from "../../components/Firebase";
import './modal.scss';
import '../Button/button.scss';
class CustomModal extends Component {
    constructor(props){
        super(props);
        this.state = {showModal: false, searchedUsers: [],familyMember: ''};
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    handleModal(){
        if (this.state.showModal === false){
           this.setState({showModal: true});
        }
        else{
          this.setState({showModal: false})
        }
        this.setState({familyMember: ''});
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render() {         
        return(
            <div>
                <Button variant="outline-secondary" onClick={this.handleModal} id="add-user-button">Add Users</Button>
            <Modal show={this.state.showModal} onHide={this.handleModal}>
                <Modal.Header closeButton>
                <Modal.Title>Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup className="mb-3">
                        <FormControl
                        placeholder="User"
                        aria-label="Users"
                        name="familyMember"
                        value={this.state.familyMember}
                        onChange={this.handleChange}
                        />
                        <InputGroup.Append>
                        <FirebaseContext.Consumer>
                        {firebase => 
                        <Button variant="outline-secondary" onClick={() => firebase.searchUsers(this.state.familyMember,this)} id="find-user-button">Search</Button>
                        }
                        </FirebaseContext.Consumer>
                        </InputGroup.Append>
                    </InputGroup>
                        <div id="searchResults">
                        {this.state.searchedUsers.map(item => (
                            <div id="searchResult" key={item.name}><p id="modalText">{item.name}</p><button variant="primary" id="modalAdd" onClick={() => this.props.action(item)}>Add</button></div>))}
                        </div>
                </Modal.Body>
            </Modal>
            </div>
        )
    }
}

export default CustomModal;