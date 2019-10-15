import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RenderFamilies from "./renderFamilies";
import Cards from "./../../components/Card";
import "./container.scss"
import "./account.scss"



class HomePage extends Component {


    render(){
        return(
            <div>
            <Paper id="familyPaper">
                <div>
                    <RenderFamilies />
                </div>
            </Paper>
                <Divider />
                <Typography variant="h2" align="center">
                    Artifacts
                </Typography>
                <div class="container">
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                </div>
            </div>
        );

    }
}

export default HomePage;
