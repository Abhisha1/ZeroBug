import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import "./imageUpload.scss";
class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageURL: null,
            isUploaded: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    /** Adapted from developer.mozilla  
     * Previews a file that is not yet uploaded to the server to users
    */
    previewFile() {
        var preview = document.getElementById('avatarBox');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onload = function () {
            // changes the avatar icon to the file's image
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    /** Handles the event where a file is selected by user 
     * @param e The event triggered by a user input change
    */
    handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.previewFile();
            this.setState({ ...this.state, image: file })
        }
    }
    /** Uploads the image to firebase storage
     */
    handleUpload = () => {
        const { image } = this.state;
        this.props.firebase.uploadProfileImage(image, this, this.props.dbLocation, this.props.name);


    }
    /**
     * Checks if the avatar image is ready to be uploaded to the server, for pages that create a new family or artefact
     */
    readyToUpload() {
        if (this.props.readyToSubmit && !this.state.isUploaded) {
            this.handleUpload();
        }
    }

    render() {
        return (
            <div id="uploadBox">
                <Grid container justify="center" alignItems="center">
                    <img id="avatarBox" src={this.state.imageURL}></img>

                </Grid>
                <input type="file" onChange={this.handleChange} id="chooseFileButton" />
                {/* Checks if the page the avatar is being used on is a create page (creating a new family or new artefact)
                When the page is creating a new object, it ensures the uploading is done only when the creation page says
                it is ready to upload.
                If the page is not creating a new object and changing the avatar of an existing user/artefact/family, it will
                display a button which will upload the new file after clicking the button */}
                {this.props.isCreate ?
                    this.readyToUpload()
                    : <button className="aButton" onClick={this.handleUpload}>Change Profile Image</button>}

            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;

