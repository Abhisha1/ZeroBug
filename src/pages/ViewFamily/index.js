import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import CustomSlider from "../../components/CardSlider";
import EditModal from '../../components/EditModal';
import AdminModal from '../../components/AdminChangeModal';
import LoadingAnimation from '../../components/LoadingAnimation';
import { Paper, Divider, Grid } from '@material-ui/core';
import Cards from '../../components/Card';
import UploadFile from "../../components/ImageUpload";
import { Link } from 'react-router-dom';
import { withAuthorization } from "../../components/Session";
import "./viewfamily.scss";
/**
 * Page which views a particular family, as chosen by users actions from
 * previous webpage
 */
class ViewFamily extends Component {

    /**
     * Renders the family details on screen, using the name of the family from
     * url or the previous webpage
     */
    render() {
        let familyName = this.props.match.params.name || this.props.location.state.name;
        return (
            <div id="viewFamilyPage">
                <ViewFamilyDetails name={familyName} />
            </div>)

    }
}
/**
 * A loading spinner to be displayed when content is being fetched
 */
const loading = <LoadingAnimation></LoadingAnimation>


/**
 * The family details as per receieved from the database, with ability
 * to edit and change details
 */
class FamilyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, family: null, loading: true, isAdmin: false, hasAccess: false, cardData: [] }
        this.handleModal = this.handleModal.bind(this);
        this.handleAdmins = this.handleAdmins.bind(this);
    }

    /**
     * Handles whether the add/edit users modal for families (only visible when admin), is closed or opened
     */
    handleModal(dataFromModal, action) {
        let usersToAdd = this.state.family["users"];
        // adds the retrieved users to the array of users to add to a family
        // whilst ensuring the user doesn't already exist in the added members
        let duplicate = false;
        for (let key in this.state.family["users"]) {
            if (this.state.family["users"][key].uid === dataFromModal.uid) {
                duplicate = true;
                // When we have removed a user (that already exists in our list), we delete from our rendered members
                if (action === "remove") {
                    usersToAdd.splice(key, 1)
                }
            }
        }
        // When we have added a user (that doesn't exists in our list), we add to our rendered members
        if (!duplicate && action === "add") {
            usersToAdd.push(dataFromModal);
        }
        //Updates the slider of family members
        this.setState({
            family: {
                name: this.state.family.name,
                users: usersToAdd,
                admin: this.state.family.admin
            }
        });
    }

    /**
     * Handles whether the add/edit users modal for families (only visible when admin), is closed or opened
     */
    handleAdmins(dataFromModal) {
        this.setState({
            family: {
                name: this.state.family.name,
                users: this.state.family.users,
                admin: dataFromModal
            }
        });
    }

    /**
     * Fetches the specified family's data from the database
     */
    async componentWillMount() {
        this.props.firebase.viewFamily(this.props.name)
            .then(value => {
                this.props.firebase.auth.onAuthStateChanged((user) => {
                    if (user) {
                        let authUser = {
                            uid: user.uid,
                            name: user.displayName,
                            photoURL: user.photoURL
                        }
                        // Checks if the current user is a member of the family
                        let currUserIsMember = false

                        // Current user is the admin
                        if (user.uid === value.admin.uid) {
                            this.setState({ family: value, loading: false, isAdmin: true, hasAccess: true });
                            currUserIsMember = true;
                            // Finds the artefacts corresponding to the family
                            return this.props.firebase.getFamiliesArtefactData(this, this.state.family);
                        }
                        //Current user is part of the family members
                        if (!currUserIsMember) {
                            value.users.map(familyMember => {
                                if (familyMember.uid === user.uid) {
                                    currUserIsMember = true;
                                    this.setState({ family: value, loading: false, hasAccess: true });
                                    // Finds the artefacts corresponding to the family
                                    return this.props.firebase.getFamiliesArtefactData(this, this.state.family);
                                }
                            })
                        }
                        if (!currUserIsMember) {
                            this.setState({ loading: false });
                        }
                    } else {
                        // User not logged in or has just logged out.
                        this.setState({ loading: false });
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    /** 
        * Function passed to child prop to search users corresponding to user input
        * @param firebase Connects to firebase server and functions
        * @param familyMemberName User entered user's name
        * @param modalState The modals current state
        */
    searchForUsers = (firebase, familyMemberName, modalState) => {
        firebase.searchUsers(familyMemberName, modalState)
    }




    /**
     * Renders the family details or a loading screen depending on
     * status of database call
     */
    render() {
        const artefacts = (<div><Divider />
            <h1 id="account-heading">Artefacts</h1>
            <Grid container direction="row" justify="center" alignItems="center">
                {/* Checks if the artefacts have been retrieved and renders them as cards */}
                {this.state.dataReady &&
                    this.state.artefactList.map(item => (
                        <div key={item.artefactName}>
                            <Cards key={item.artefactName} artefactName={item.artefactName} description={item.artefactBrief} date={item.date} />
                        </div>
                    ))
                }
                {this.state.dataReady && this.state.artefactList.length === 0 && 
                <h4>You don't seem to have any shared artefacts. You can either share an <Link to={{ pathname: '/home/' }}>existing artefact</Link> or <Link to={{ pathname: '/createartefact' }}> create an artefact</Link></h4>
                }
            </Grid>

        </div>)

        return (
            <div id="viewFamilyPage">
                {/* Checks if the page is still retreiving data */}
                {this.state.loading ? <div id="loader">{loading}</div> :
                    (!this.state.hasAccess ?
                        // User is not part of family so cannot access family
                        (<Paper>
                            <h1>Uh oh! You don't have access to this family</h1>
                            <h4>To find families you have access to, head back to <Link
                                to={{ pathname: '/home/' }}
                            >My Home</Link></h4></Paper>)
                        // User has access so can view family information
                        : (<div>
                            <h1 id="familyName">{this.props.name}</h1>
                            <UploadFile dbLocation="familyImages/" isCreate={false} name={this.props.name} />

                            {/* Admins can edit users and change admin */}
                            <Paper id="paperCard">
                                <h1 id="familyMembers">Members</h1>
                                {this.state.isAdmin && (<div id="adminConfigBar">
                                    <EditModal action={this.handleModal} collection={this.state.family} title="families" itemIsUser={true} search={this.searchForUsers} ></EditModal>
                                    <AdminModal action={this.handleAdmins} family={this.state.family}></AdminModal>
                                </div>)
                                }
                                <CustomSlider cards={this.state.family["users"]}></CustomSlider>
                            </Paper>
                            {/* Renders the artefacts onto the page */}
                            {artefacts}
                        </div>))
                }

            </div>
        );
    }
}

const ViewFamilyDetails = withFirebase(FamilyDetails);
export { ViewFamilyDetails }

// Ensures only an authorised user can view families (that they belong in)
const condition = authUser => !!authUser;
export default withAuthorization(condition)(ViewFamily);
