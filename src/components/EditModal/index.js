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
        this.state = { showModal: false, searchedResults: [], name: '',loading: false};
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
        this.setState({ name: '', searchUsers: [] });
    }

    /**
     * Changes the respective values on input changes
     * @param event The event trigerred by an input change
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, searchedResults: [] });
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
        this.addOrRemoveItem(item, firebase);
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
        this.addOrRemoveItem(item, firebase);
    }

    /**
     * Checks if an item belongs in the collection of interest, and renders an add option if they dont and remove if they do
     * @param item The user or family we are checking whether they exist or not
     * @return All items (besides admin user) and whether you can add or remove them
     */
    addOrRemoveItem(item, firebase) {
        let collection =this.props.collection["authFamilies"] ? this.props.collection["authFamilies"] : this.props.collection["users"];
        console.log(collection)
        for (let key in collection) {
            console.log(collection[key].displayName+"   and name we looking for  "+item.displayName);
            let existing = collection[key];
            if (item.uid){
                if (item.uid === this.props.collection.admin.uid) {
                    return;
                }
                else if (existing.uid === item.uid) {
                    return (
                        <div id="searchResult" key={item.uid || item.displayName}>
                            {item.displayName && <p id="modalText">{item.displayName}</p>}
                            <Button variant="outlined" id="modalRemove" onClick={() => this.remove(item, firebase)}>Remove</Button>
                        </div>)
                }
            }
            if (item.displayName && item.displayName === existing.displayName) {
                return (
                    <div id="searchResult" key={item.displayName}>
                        {item.displayName && <p id="modalText">{item.displayName}</p>}
                        
                        <Button variant="outlined" id="modalRemove" onClick={() => this.remove(item, firebase)}>Remove</Button>
                    </div>)
            }
        }
        return (<div id="searchResult" key={item.uid || item.displayName}>
        {item.displayName && <p id="modalText">{item.displayName}</p>}
                        {item.name && <p id="modalText">{item.name}</p>}
            <Button variant="outlined" id="modalAdd" onClick={() => this.add(item, firebase)}>Add</Button>
        </div>);

    }

    /**
     * Searches matching users
     * @param firebase Returns an object to access firebase functions
     */
    searchData(firebase){
        this.setState({loading:true, noMatches: false});
        this.props.search(firebase, this.state.name, this)

    }

    /**
     * Returns the custom modal to the webpage
     */
    render() {
        return (
            <div>
                <Grid container justify="flex-end">
                    <Fab id="circleEditButton" onClick={this.handleModal}>
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
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            {/* Searches database for users matching input search */}
                                            <Button variant="outlined" onClick={() => this.searchData(firebase)} id="edit-button">Search</Button>

                                        </InputGroup.Append>
                                    </InputGroup>
                                    {/* Renders the search result in modal */}
                                    <div id="searchResults">
                                        {this.state.searchedResults.map(item => (
                                            this.addOrRemoveItem(item, firebase)))}
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
