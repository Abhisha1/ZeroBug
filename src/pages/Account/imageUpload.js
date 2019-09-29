import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';

class ImageUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            imageURL: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange = e => {
        if(e.target.files[0]){
            const file = e.target.files[0];
            this.setState({... this.state, image: file})
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = this.props.firebase.uploadProfileImage(image, this);

    }

    render(){
        return(
            <div>
                <div id="topWraper">
					<h1 id="account-heading">Your Profile</h1>
					<div id="topContainer">
						<div id="avatarContainer">
							<img id="avatarBox" src={this.state.imageURL}></img>
                            {/*
                                <input className="testInput" type="file" id="inputFile" onChange={this.handleChange} style={{backgroundColor: "red", border: "1px"}} />
                                <label onChange={this.handleChange} for="inputFile">Choose a file...</label>
                            */}
                            <input type="file" onChange={this.handleChange} id="chooseFile"/>
							<button className="aButton" onClick={this.handleUpload}>Change Profile Image</button>
						</div>
						<div id="profileInformationContainer">
							<h2 id="profile-name">Name</h2>
							<button className="aButton" id="changePasswordButton">Change Password</button>
						</div>
					</div>
				</div>
            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;