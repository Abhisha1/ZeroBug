import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import UploadFile from "../../components/ImageUpload";
import "./account.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import yellow from '@material-ui/core/colors/yellow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';



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
    

    // get the user name and the profile image if he/she has
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({username: user.displayName});
                this.props.firebase.getImageURL(this, "profileImages/", this.state.username, user);
            }
            
        })  
    }

    // get the password from the textField
    handleChange = e => {
        this.setState({...this.state, password: e.target.value});     
    }

    // let user update the password
    handleUpload = () => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            user.updatePassword(this.state.password).then(function() {
                // Update successful
                console.log("update password");
              }).catch(function(error) {
                // An error happened
              });
            
        })
    }


    render(){
        return(
            <div>
                <div id="topWraper">
                    <div id="profileContainer">
                        <Paper id="paperStyle">
                            <h1 id="account-heading">{this.state.username}</h1>
                            <div id="userInformation">                             
                                <Avatar alt="Remy Sharp" src={this.state.imageURL} id="avatarBox"></Avatar>
                            </div>
                        </Paper>
                    </div>
                    <div id="profileChange">
                        <Paper>
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
                        </Paper>
                    </div>
				</div>        
            </div>
        )
    }
}
const profileThings = withRouter(withFirebase(Profile));
export default profileThings;