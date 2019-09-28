import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import CustomSlider from "../../components/CardSlider";
import { Spinner } from 'react-bootstrap';
import { HOME } from "../../constants/routes";
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
        let familyName = this.props.location.state.name || this.props.match.params.name;
        return (
            <div>
                <ViewFamilyDetails name={familyName} />
            </div>)
    }
}
/**
 * A loading spinner to be displayed when content is being fetched
 */
const loading = <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
</Spinner>

/**
 * The family details as per receieved from the database, with ability
 * to edit and change details
 */
class FamilyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { family: null, loading: true }
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
                        <h1>Family name</h1>
                        <p>{this.props.name}</p>
                        <h1>Members</h1>
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