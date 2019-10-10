
import React,{Component} from 'react';
import {FirebaseContext} from "../../components/Firebase";
import CustomDeck from "../../components/CardSlider";
import {Modal} from 'react-bootstrap';
import {HOME} from "../../constants/routes";
import { withAuthorization } from "../../components/Session";
import LoadingAnimation from '../../components/LoadingAnimation';

const errorModal = () => (
<Modal onHide={() => this.props.history.push(HOME)}>
    <Modal.Header closeButton>
        <Modal.Title> {this.state.confirmationTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{this.state.message}</Modal.Body>
    <Modal.Footer>
        <button variant="primary" onClick={() => this.props.history.push(HOME)}>Close</button>
    </Modal.Footer>
</Modal>
)
class ViewFamily extends Component{
    constructor(props){
        super(props);
    }


    componentDidMount(){
        console.log("Did mount");
        return(
            <FirebaseContext.Consumer>
                  {firebase =>
                    firebase.viewFamily(this.props.match.params.name)
                    .then(item => {
                        console.log(item);
                        this.setState({familyMembers: item.users, name: this.props.match.params.name});
                    })
                    .catch(error => {
                        console.log("ERRHHRB");
                        return(<errorModal></errorModal>)
                    })
                  }
            </FirebaseContext.Consumer>
        )

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

                <h1>Family name</h1>
                    <p>{this.state.name}</p>
                <h1>Members</h1>
                <CustomDeck cards={this.state.familyMembers}></CustomDeck>
                <FirebaseContext.Consumer>
                  {firebase =>
                    firebase.viewFamily(this.props.match.params.name)
                    .then(item => {
                        console.log(item);
                        this.setState({familyMembers: item.users, name: this.props.match.params.name});
                    })
                    .catch(error => {
                        console.log("ERRHHRB");
                        return(<errorModal></errorModal>)
                    })
                  }
            </FirebaseContext.Consumer>

            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ViewFamily);

