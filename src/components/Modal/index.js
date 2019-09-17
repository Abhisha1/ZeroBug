import React, { Component } from "react";
import {Modal} from "react-bootstrap";
class CustomModal extends Component {
    constructor(props){
        super(props);
        this.state = {showModal: true};
        this.handleModal = this.handleModal.bind(this);

    }
    handleModal(){
        if (this.state.showModal === false){
            console.log('open modal');
           this.setState({showModal: true});
        }
        else{
          this.setState({showModal: false})
        }
    }

    render() {         
        return(
            <Modal show={this.state.showModal} onHide={this.handleModal}>
                <Modal.Header closeButton>
                <Modal.Title>Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>



                </Modal.Body>
            </Modal>
        )
    }
}

export default CustomModal;