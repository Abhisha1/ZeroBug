import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import "./imageUpload.scss";
/**
 * An image upload component which allows a particular entity, like a family, user or artefact to upload an image
 * an store it on the firebase storage
 */
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
            this.handleUpload()
        }
    }
    /**
     * If the page is of an existing object (family or user), then we render the current profile image
     */
    componentDidMount() {
        if (!this.props.isCreate) {
            console.log("db location is " + this.props.dbLocation + " and name is " + this.props.name);
            // retireves image from storage
            this.props.firebase.findImage(this.props.dbLocation, this.props.name)
                .then(url => {
                    console.log(url);
                    this.setState({ imageURL: url });
                })
                // catches error for when the file does not exist
                .catch(error => {
                    console.log(error);
                })
        }
    }

    /**
     * Renders the upload avatar/image functionality on the page
     */
    render() {

        console.log(this.state.imageURL);
        return (
            <div id="uploadBox">
                <Grid container justify="center" alignItems="center">
                    <img id="avatarBox" alt="avatar" src={this.state.imageURL}></img>

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

