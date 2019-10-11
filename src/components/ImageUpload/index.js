import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
        if (this.props.readyToSubmit && !this.state.isUploaded && this.state.image) {
            this.handleUpload();
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

    render() {
        return (
            <div id="uploadBox">
                <Grid container justify="center" alignItems="center">
                    <img id="avatarBox" src={this.state.imageURL}></img>

                </Grid>
                <input
                    id="imageUpload"
                    multiple
                    type="file"
                    onChange={this.handleChange}
                />
                 {/* Checks if the page the avatar is being used on is a create page (creating a new family or new artefact)
                When the page is creating a new object, it ensures the uploading is done only when the creation page says
                it is ready to upload.
                If the page is not creating a new object and changing the avatar of an existing user/artefact/family, it will
                display a button which will upload the new file after clicking the button */}
                <div id="styledUpload">
                    <label htmlFor="imageUpload">
                        {this.props.isCreate ?
                            (<Button variant="outlined" component="span" id="uploadStyledButton">
                                Upload
                            </Button> && this.readyToUpload())
                    : (
                    <Button variant="outlined" component="span" id="uploadStyledButton" onClick={this.handleUpload}>
                            Upload
                    </Button>
                    )}
                    </label>
                </div>



            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;