import React,{Component} from 'react';
import {FirebaseContext} from "../../components/Firebase";
import CustomDeck from "../../components/CardSlider";
import {Modal} from 'react-bootstrap';
import {HOME} from "../../constants/routes";
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
        this.state = {familyMembers: [], isAdmin: false, name: ''}
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

    render(){
        return(
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
export default ViewFamily;