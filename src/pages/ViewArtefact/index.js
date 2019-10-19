import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import CustomSlider from "../../components/CardSlider";
import EditModal from '../../components/EditModal';
import AdminModal from "../../components/AdminChangeModal"
import LoadingAnimation from '../../components/LoadingAnimation';
import { Paper, GridList, GridListTile } from '@material-ui/core';
import UploadFile from "../../components/ImageUpload";
import { withAuthorization } from "../../components/Session";
import { Timestamp } from '@google-cloud/firestore';
import { Link } from 'react-router-dom';
import "./viewartefact.scss";

// import "./viewartefact.scss";
// import "~react-image-gallery/styles/scss/image-gallery.scss";
/**
 * Page which views a particular artefact, as chosen by users actions from
 * previous webpage
 */




class ViewArtefact extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * Renders the artefact details on screen, using the name of the artefact from
     * url or the previous webpage
     */
    render() {
        let artefactName = this.props.match.params.name || this.props.location.state.name;
        return (
            <div>
                <ViewArtefactDetails name={artefactName} />
            </div>)
    }
}
/**
 * A loading spinner to be displayed when content is being fetched
 */
const loading = <LoadingAnimation></LoadingAnimation>


/**
 * The artefact details as per receieved from the database, with ability
 * to edit and change details
 */
class ArtefactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, artefact: null, loading: true, isAdmin: false, hasAccess: false }
        this.handleModal = this.handleModal.bind(this);
    }



    /**
   * Function passed to child prop to search families corresponding to user input
   * @param firebase Connects to firebase server and functions
   * @param familyName User entered family name
   * @param modalState The modals current state
   */
    searchFamilies = (firebase, familyName, modalState) => {
        firebase.searchFamilies(familyName, modalState);
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
     * Handles whether the add/edit users modal for families (only visible when admin), is closed or opened
     */
    handleModal() {
        if (this.state.showModal === false) {
            this.setState({ showModal: true });
        }
        else {
            this.setState({ showModal: false })
        }
        this.setState({ artefactMember: '' });
    }
    /**
     * Fetches the specified artefacts data from the database
     */
    async componentWillMount() {
        console.log("componentn wiull mount");
        this.props.firebase.viewArtefact(this.props.name)
            .then(value => {
                this.props.firebase.auth.onAuthStateChanged((user) => {
                    if (user) {
                        let authUser = {
                            uid: user.uid,
                            name: user.displayName,
                            phtoURL: user.photoURL
                        }
                        console.log("curr user is " + user.uid + "values uid  " + value.admin.uid)
                        if (user.uid === value.admin.uid) {
                            this.setState({ artefact: value, loading: false, isAdmin: true, hasAccess: true });
                        }
                        let currUserIsMember = false
                        value.users.map(familyMember => {
                            if (familyMember.uid === user.uid) {
                                currUserIsMember = true;
                                this.setState({ family: value, loading: false, hasAccess: true });
                            }
                        })
                        if (!currUserIsMember && value.authFamilies) {
                            value.authFamilies.map(family => {
                                family.users.map(familyMember => {
                                    if (familyMember.uid === user.uid) {
                                        currUserIsMember = true;
                                        this.setState({ family: value, loading: false, hasAccess: true });
                                    }
                                })
                            })
                        }
                        if (!currUserIsMember) {
                            this.setState({ loading: false });
                        }
                    } else {
                        this.setState({ loading: false });
                        // User not logged in or has just logged out.
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
 * Convert date to readable date
 */
    convertDate = (date) => {
        let newDate = new Timestamp(date["seconds"], date["nanoseconds"])
        return newDate.toDate().toDateString();
    }


    /**
     * Renders the artefact details or a loading screen depending on
     * status of database call
     */
    render() {

        return (
            <div id="viewArtefactPage">
                {this.state.loading ? <div id="loader">{loading}</div> :
                    (!this.state.hasAccess ?
                        (<Paper>
                            <h1>Uh oh! You don't have access to this family</h1>
                            <h4>To find families you have access to, head back to <Link
                                to={{ pathname: '/home/' }}
                            >My Home</Link></h4></Paper>) : (
                            <div>
                                {/* <ImageGallery items={this.state.artefact} /> */}
                                <h1 id="artefactName">{this.props.name}</h1>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginBottom: '2vw'
                                    }}>
                                    <GridList cellHeight={200} style={{
                                        width: "75%",
                                        height: "45%"
                                    }} cols={3}>
                                        {this.state.artefact.imagesURL.map(url => (
                                            <GridListTile key={url} cols={1}>
                                                <img src={url}/>
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                                {this.state.isAdmin && <AdminModal id="adminArtefactModal" action={this.handleModal} collection={this.state.artefact}></AdminModal>}
                                <Paper id="paperCard">
                                    <h5 className="descriptionTitle">Date</h5>
                                    {/* {console.log(this.props.firebase.convertDate(this.state.artefact.date.toDateString()))} */}
                                    <p>{this.convertDate(this.state.artefact.date)}</p>
                                    <h5 className="descriptionTitle">Brief Description</h5>
                                    <p>{this.state.artefact.artefactBrief}</p>
                                    <h5 className="descriptionTitle">Location</h5>
                                    <p>{this.state.artefact.location}</p>
                                    {this.state.artefact.description && <div><h5 className="descriptionTitle">History</h5>
                                        <p>{this.state.artefact.description}</p></div>}
                                </Paper>
                                <Paper id="paperCard">
                                    <h1 className="memberHeadings">Shared users</h1>
                                    {this.state.isAdmin && (
                                        <EditModal action={this.handleModal} collection={this.state.artefact} title="artefacts" itemIsUser={true} search={this.searchForUsers}></EditModal>
                                    )
                                    }
                                    {this.state.artefact.users && <CustomSlider cards={this.state.artefact["users"]}></CustomSlider>}
                                </Paper>
                                <Paper id="paperCard">
                                    <h1 className="memberHeadings">Shared families</h1>
                                    {this.state.isAdmin && (
                                        <EditModal action={this.handleModal} collection={this.state.artefact} title="artefacts" itemIsUser={false} search={this.searchFamilies}></EditModal>
                                    )
                                    }
                                    {this.state.artefact.authFamilies && <CustomSlider cards={this.state.artefact["authFamilies"]}></CustomSlider>}
                                </Paper>
                            </div>))
                }
            </div>
        );
    }
}
const ViewArtefactDetails = withFirebase(ArtefactDetails);
export { ViewArtefactDetails }

// Ensures only an authorised user can view families (that they belong in)
const condition = authUser => !!authUser;
export default withAuthorization(condition)(ViewArtefact);
