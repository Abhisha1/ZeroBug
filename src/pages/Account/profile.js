import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import UploadFile from "../../components/ImageUpload";
import "./account.scss";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';


const primary = yellow[500];

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: null,
            imageURL: null,
            password: null,
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

    handleChange = e => {
        this.setState({...this.state, password: e.target.value});
        
    }

    handleUpload = () => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            user.updatePassword(this.state.password).then(function() {
                // Update successful.
                console.log("update password");
              }).catch(function(error) {
                // An error happened.
              });
            
        })
    }


    render(){
        return(
            <div>
                <div id="topWraper">
						<h1 id="account-heading">Your Profile</h1>
                        <div id="user-information">
                            <img id="avatarBox" src={this.state.imageURL}></img>
                            <h3 id="profile-name">{this.state.username}</h3>
                        </div>
						<div id="topContainer">
							<UploadFile dbLocation="profileImages/" isCreate={false} name={this.state.username}/>
							<div id="profileInformationContainer">
                                <TextField
                                    variant="outlined"
                                    label="Update Password"
                                    type="password"
                                    onChange={this.handleChange}></TextField>
                                <Button variant="outlined" className="aButton" onClick={this.handleUpload}>Change Password</Button>
                                
							</div>
						</div>

				</div>
                
            </div>
        )
    }
}
const profileThings = withRouter(withFirebase(Profile));
export default profileThings;