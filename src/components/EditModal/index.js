import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FirebaseContext } from "../../components/Firebase";
import './editmodal.scss';
import '../Button/button.scss';

/**
 * CustomModal is used to search through users and return matching users
 * in a pop up/modal.
 */

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, searchedUsers: [], familyMember: '' };
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * This function changes the modal's visibility depending approapriately
     * and resets the family members stored state.
     */
    handleModal() {
        if (this.state.showModal === false) {
            this.setState({ showModal: true });
        }
        else {
            this.setState({ showModal: false })
        }
        this.setState({ familyMember: '' });
    }

    /**
     * Changes the respective values on input changes
     * @param event The event trigerred by an input change
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    /**
     * Checks if a user belongs in the family of interest
     * @param user The user we are checking whether they exist or not
     * @return A boolean value indicating whether the member exists or not
     */
    existingFamilyMember(user) {
        console.log(user.name);
        for (let key in this.props.family["users"]) {
            // console.log(existingUser.name+"   and name we looking for  "+user.name);
            let existingUser = this.props.family["users"][key].name;
            if (existingUser === user.name) {
                console.log("Match");
                return true;
            }
        }
        console.log("noep");
        return false;
    }


    /**
     * Returns the custom modal to the webpage
     */
    render() {
        return (
            <div>

                <Button variant="outline-secondary" onClick={this.handleModal} id="edit-button">Edit Users</Button>

                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Current Members</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FirebaseContext.Consumer>
                            {firebase =>
                                // Search bar
                                <div>
                                    < InputGroup className="mb-3" >
                                        <FormControl
                                            placeholder="User"
                                            aria-label="Users"
                                            name="familyMember"
                                            value={this.state.familyMember}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            {/* Searches database for users matching input search */}
                                            <Button variant="outline-secondary" onClick={() => firebase.searchUsers(this.state.familyMember, this)} id="edit-button">Search</Button>

                                        </InputGroup.Append>
                                    </InputGroup>
                                    {/* Renders the search result in modal */}
                                    <div id="searchResults">
                                        {this.state.searchedUsers.map(user => (
                                            <div id="searchResult" key={user.name}><p id="modalText" key={user.name}>{user.name}</p>
                                                {this.existingFamilyMember(user) ?
                                                    <button variant="primary" id="modalRemove" onClick={() => firebase.removeFromFamily(user, this.props.family)}>Remove</button>
                                                    :
                                                    <button variant="primary" id="modalAdd" onClick={() => firebase.addToFamily(user, this.props.family)}>Add</button>}
                                            </div>))}
                                    </div>
                                </div>
                            }
                        </FirebaseContext.Consumer>
                    </Modal.Body>

                </Modal>

            </div >
        )
    }
}

export default EditModal;