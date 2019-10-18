import React, { Component } from "react";
import Cards from "./../../components/Card";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import "./container.scss"

import {Link} from 'react-router-dom';
import { withAuthorization } from "./../../components/Session";
import RenderFamilies from "./renderFamilies";
import RenderArtefacts from './renderArtefacts';


class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            artefactList: null,
            username: null,
            dataReady: false,
            cardData: null,
        }
    }
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({username: user.displayName});
                this.props.firebase.getArtefactData(this, this.state.username);
            }
        })
    }

    render(){
        console.log(this.state.artefactList);
        return(

            <div>
              <div>
                <RenderFamilies/>
              </div>
                <Divider />
                <h1 id="account-heading">Your Artifacts</h1>
                <div class="textboxContainer">
                    <TextField className="textbox" type="search" variant="outlined" margin-right="20px" placeholder="Search for Artifact"/>

                    <Typography >
                    Sort by:
                    </Typography>
                </div>
                <div class="container">
                    //<Cards artifactName="artifactName" description="description" date="01/01/2000" link="/"/>
                    {for(let item in this.state.artefactList)
                        <Cards artifactName={item.name} description={item.name.artefactBrief} date="01/01/2000" link="/"/>
                    
                </div>

            </div>

        );

    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
