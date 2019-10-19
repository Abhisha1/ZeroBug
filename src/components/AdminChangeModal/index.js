import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "@material-ui/core/Button"
import { FirebaseContext } from "../../components/Firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import "./adminModal.scss";

/**
 * CustomModal is used to search through users and return matching users
 * in a pop up/modal.
 */

class AdminModal extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, searchedUsers: [], familyMember: '', loading: false };
        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
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
        this.setState({ familyMember: '', searchUsers: [] });
    }

    /**
     * Changes the respective values on input changes
     * @param event The event trigerred by an input change
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, searchedUsers: [] });
    }

    /**
     * Changes admin to the provided admin
     * @param user The user to be made admin
     * @param firebase The functions to connect to firebase server
     */
    changeAdmin(user, firebase) {
        firebase.updateAdmin(user, 'families', this.props.family);
        this.props.action(user);
        this.renderPotentialAdmins(user, firebase);
    }


    /**
     * Checks if a user belongs in the family of interest, and renders an add option if they dont and remove if they do
     * @param user The user we are checking whether they exist or not
     * @return All users (besides admin) and whether you can add or remove them
     */
    renderPotentialAdmins(user, firebase) {
        for (let key in this.props.family["users"]) {
            // console.log(existingUser.name+"   and name we looking for  "+user.name);
            let existingUser = this.props.family["users"][key].uid;
            if (user.uid === this.props.family.admin.uid) {
                return;
            }
            else {
                return (<div id="searchResult" key={user.uid}><p id="modalText" key={user.uid}>{user.displayName}</p>
                    <Button variant="outlined" id="change-user-button" onClick={() => this.changeAdmin(user, firebase)}>Make Admin</Button>
                </div>)
            }
        }

    }

    /**
     * Searches matching users
     * @param firebase Returns an object to access firebase functions
     */
    searchForUsers(firebase) {
        this.setState({ loading: true, noMatches: false });
        firebase.searchUsers(this.state.familyMember, this);

    }

    /**
     * Returns the custom modal to the webpage
     */
    render() {
        return (
            <div>

                <Button variant="outlined" onClick={this.handleModal} id="change-button">Change Admin</Button>

                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose a new admin</Modal.Title>
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
                                            <Button variant="outlined" onClick={() => this.searchForUsers(firebase)} id="search-button">Search</Button>

                                        </InputGroup.Append>
                                    </InputGroup>
                                    {/* Renders the search result in modal */}
                                    <div id="searchResults">
                                        {this.state.searchedUsers.map(user => (
                                            this.renderPotentialAdmins(user, firebase)))}
                                        {this.state.noMatches && <p>No Matches</p>}
                                    </div>
                                    {/* Displays a loader for when the API is still fetching the results */}
                                    <div id="loader">
                                        {this.state.loading ?
                                            <CircularProgress /> : <div></div>}
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

export default AdminModal;