import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FirebaseContext } from "../../components/Firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import './modal.scss';
import '../Button/button.scss';

/**
 * CustomModal is used to search through users and return matching users
 * in a pop up/modal.
 */

class CustomModal extends Component {
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
        this.setState({ name: '' , searchedResults: []});
    }

    /**
     * Changes the respective values on input changes
     * @param event The event trigerred by an input change
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // Resets the displayed users when the user starts searching for someone
        this.setState({ [name]: value , searchedResults: []});
    }

    /**
     * Calls the parent classes search function to either search families or users
     * @param firebase Connects to firebase functions
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
                <Button variant="outline-secondary" onClick={this.handleModal} id="add-user-button">Add {this.props.title}</Button>
                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add {this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Search bar */}
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder={this.props.title}
                                aria-label={this.props.title}
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            <InputGroup.Append>
                                <FirebaseContext.Consumer>
                                    {firebase =>
                                        // Searches database for users matching input search
                                        <Button variant="outline-secondary" onClick={() => this.searchData(firebase)} id="find-user-button">Search</Button>
                                    }
                                </FirebaseContext.Consumer>
                            </InputGroup.Append>
                        </InputGroup>
                        {/* Renders the search result in modal */}
                        <div id="searchResults">
                            {
                                this.state.searchedResults.map(item => (
                                <div id="searchResult" key={item.uid || item.name}>
                                    {item.displayName && <p id="modalText">{item.displayName}</p>}
                                    {item.name && <p id="modalText">{item.name}</p>}
                                    <button variant="primary" id="modalAdd" onClick={() => this.props.action(item)}>Add</button></div>))}
                            {this.state.noMatches && <p>No Matches</p>}
                        </div>
                        {/* Displays a loader for when the API is still fetching the results */}
                        <div id="loader">
                                {this.state.loading ?
                                <CircularProgress />: <div></div>}
                        </div>
                        
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default CustomModal;