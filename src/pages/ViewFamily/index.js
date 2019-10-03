import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import CustomSlider from "../../components/CardSlider";
import EditModal from '../../components/EditModal';
import LoadingAnimation from '../../components/LoadingAnimation';
import UploadFile from "../../components/ImageUpload";
/**
 * Page which views a particular family, as chosen by users actions from
 * previous webpage
 */
class ViewFamily extends Component {
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
            <div>
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
        this.state = { showModal:false, family: null, loading: true }
        this.handleModal = this.handleModal.bind(this);
    }
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
                this.setState({ family: value, loading: false });
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
                {this.state.loading ? loading :
                    <div>
                        <UploadFile dbLocation="familyImages/" isCreate={false} name={this.props.name} />
                        <h1>Family name</h1>
                        <p>{this.props.name}</p>
                        <h1>Members</h1>
                        <EditModal action={this.handleModal} family={this.state.family}></EditModal>
                        <CustomSlider cards={this.state.family["users"]}></CustomSlider>
                    </div>
                }
            </div>
        );
    }
}
export default ViewFamily;
const ViewFamilyDetails = withFirebase(FamilyDetails);
export { ViewFamilyDetails }