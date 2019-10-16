import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import CustomSlider from "../../components/CardSlider";
import EditModal from '../../components/EditModal';
import LoadingAnimation from '../../components/LoadingAnimation';
import Paper from '@material-ui/core/Paper';
import UploadFile from "../../components/ImageUpload";
import { withAuthorization } from "../../components/Session";
import "./viewfamily.scss";
import "~react-image-gallery/styles/scss/image-gallery.scss";
/**
 * Page which views a particular family, as chosen by users actions from
 * previous webpage
 */
class ViewArtefact extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * Renders the family details on screen, using the name of the family from
     * url or the previous webpage
     */
    render() {
        let familyName = this.props.match.params.name || this.props.location.state.name;
        return (
            <div id="viewFamilyPage">
                <ViewArtefactDetails name={familyName} />
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
        this.state = { showModal: false, family: null, loading: true, isAdmin: false }
        this.handleModal = this.handleModal.bind(this);
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
        this.setState({ familyMember: '' });
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
                            email: user.email
                        }
                        console.log(value)
                        if (user.uid === value.admin.uid) {
                            this.setState({ family: value, loading: false, isAdmin: true });
                        }
                        this.setState({ family: value, loading: false });
                    } else {
                        this.setState({ family: value, loading: false });
                        // User not logged in or has just logged out.
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    /**
     * Renders the family details or a loading screen depending on
     * status of database call
     */
    render() {
        return (
            <div>
                {this.state.loading ? <div id="loader">{loading}</div> :
                    <div>
                        <ImageGallery items={this.state.artefact} />
                        <h1 id="artefactName">{this.props.name}</h1>
                        <Paper id="paperCard">
                            <h1>Family Members</h1>
                            {this.state.isAdmin && (<EditModal action={this.handleModal} family={this.state.family}></EditModal>)
                            }
                            <CustomSlider cards={this.state.family["users"]}></CustomSlider>
                        </Paper>
                        <Paper id="paperCard">
                            <h1>Other Users</h1>
                            {this.state.isAdmin && (<EditModal action={this.handleModal} family={this.state.family}></EditModal>)
                            }
                            <CustomSlider cards={this.state.users["users"]}></CustomSlider>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}
const ViewArtefactDetails = withFirebase(FamilyDetails);
export { ViewArtefactDetails }

// Ensures only an authorised user can view families (that they belong in)
const condition = authUser => !!authUser;
export default withAuthorization(condition)(ViewArtefact);
