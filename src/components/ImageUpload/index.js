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
    /** Adapted from developer.mozilla  */
    previewFile() {
        var preview = document.getElementById('avatarBox');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onload = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.previewFile();
            this.setState({...this.state, image: file })
        }
    }

    handleUpload = () => {
        const { image } = this.state;
        this.props.firebase.uploadProfileImage(image, this, this.props.dbLocation, this.props.name);


    }

    readyToUpload(){
        if (this.props.readyToSubmit && !this.state.isUploaded){
            this.handleUpload();    
        }
    }

    render() {
        // const classes = useStyles();
        return (
            <div id="uploadBox">
                <Grid container justify="center" alignItems="center">
                <img id="avatarBox" src={this.state.imageURL}></img>

                </Grid>
                <input type="file" onChange={this.handleChange} id="chooseFileButton"/>
                {this.props.isCreate ?
                    this.readyToUpload()
                    : <button className="aButton" onClick={this.handleUpload}>Change Profile Image</button>}

            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;

