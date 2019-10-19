import React, { Component } from "react";
import { InputGroup, FormControl, Modal } from "react-bootstrap";
import { Fab, Button, CircularProgress, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { FirebaseContext } from "../../components/Firebase";
import './editmodal.scss';

/**
 * CustomModal is used to search through users and return matching users
 * in a pop up/modal.
 */

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, searchedUsers: [], familyMember: '',loading: false};
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
     * Removes a user or family and refreshes the page
     * @param item The user or family to be deleted
     * @param firebase The functions to connect to firebase server
     */
    remove(item, firebase) {
        if(this.props.itemIsUser){
            firebase.removeUserFromCollection(item, this.props.title, this.props.collection);
        }
        else{
            firebase.removeFamilyAccess(item, this.props.title, this.props.collection)
        }
        this.props.action(item, "remove");
        this.addOrRemoveMembers(item, firebase);
    }


    /**
     * Adds an item (user or family) and refreshes the page
     * @param item The user or family to be added
     * @param firebase The functions to connect to firebase server
     */
    add(item, firebase) {
        if(this.props.itemIsUser){
            firebase.addUserToCollection(item, this.props.title, this.props.collection);
        }
        else {
            firebase.grantFamilyAccess(item, this.props.title, this.props.collection)
        }
        this.props.action(item, "add");
        this.addOrRemoveMembers(item, firebase);
    }

    /**
     * Checks if a user belongs in the family of interest, and renders an add option if they dont and remove if they do
     * @param user The user we are checking whether they exist or not
     * @return All users (besides admin) and whether you can add or remove them
     */
    addOrRemoveMembers(user, firebase) {
        for (let key in this.props.collection["users"]) {
            // console.log(existingUser.name+"   and name we looking for  "+user.name);
            let existingUser = this.props.collection["users"][key].uid;
            if (user.uid === this.props.collection.admin.uid) {
                return;
            }
            else if (existingUser === user.uid) {
                return (
                    <div id="searchResult" key={user.uid}><p id="modalText" key={user.uid}>{user.displayName}</p>
                        <Button variant="outlined" id="modalRemove" onClick={() => this.remove(user, firebase)}>Remove</Button>
                    </div>)
            }
        }
        return (<div id="searchResult" key={user.uid}><p id="modalText" key={user.uid}>{user.displayName}</p>
            <Button variant="outlined" id="modalAdd" onClick={() => this.add(user, firebase)}>Add</Button>
        </div>);

    }

    /**
     * Searches matching users
     * @param firebase Returns an object to access firebase functions
     */
    searchForUsers(firebase){
        this.setState({loading:true, noMatches: false});
        firebase.searchUsers(this.state.familyMember, this)

    }

    /**
     * Returns the custom modal to the webpage
     */
    render() {
        return (
            <div>
                <Grid container justify="flex-end">
                    <Fab color="secondary" onClick={this.handleModal}>
                        <EditIcon />
                    </Fab>
                </Grid>
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
                                            <Button variant="outlined" onClick={() => this.searchForUsers(firebase)} id="edit-button">Search</Button>

                                        </InputGroup.Append>
                                    </InputGroup>
                                    {/* Renders the search result in modal */}
                                    <div id="searchResults">
                                        {this.state.searchedUsers.map(user => (
                                            this.addOrRemoveMembers(user, firebase)))}
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

export default EditModal;