import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import UploadFile from "../../components/ImageUpload";
import "./account.scss";
import Grid from '@material-ui/core/Grid';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: null,
            imageURL: null,
        }
    }

    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({username: user.displayName});
                this.props.firebase.getImageURL(this, "profileImages/", this.state.username);
            }
            
        })
        
   
    }

    

    render(){
        return(
            <div>
                <div id="topWraper">
						<h1 id="account-heading">Your Profile</h1>
                        <div id="user-information">
                            <img id="avatarBox" src={this.state.imageURL}></img>
                            <h2 id="profile-name">{this.state.username}</h2>
                        </div>
						<div id="topContainer">
							<UploadFile dbLocation="profileImages/" isCreate={false} name={this.state.username}/>
							<div id="profileInformationContainer">
								<button className="aButton" id="changePasswordButton">Change Password</button>
							</div>
						</div>
				</div>
                
            </div>
        )
    }
}
const profileThings = withRouter(withFirebase(Profile));
export default profileThings;