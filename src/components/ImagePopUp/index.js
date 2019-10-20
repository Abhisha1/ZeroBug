import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class ImagePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false }
        this.handleModal = this.handleModal.bind(this);
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
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.url} />
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}

export default ImagePopUp;