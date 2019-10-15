import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RenderFamilies from "./renderFamilies";
import Cards from "./../../components/Card";
import "./container.scss"
import "./account.scss"

import React from "react";
import {Link} from 'react-router-dom';
import { withAuthorization } from "./../../components/Session";

const HomePage = () => (
  <div>
    <h1>HOME! TEST!</h1>
    <Link
    to={{ pathname: '/family/Monkees', state: { name: 'Monkees'} }}
    >TEST VIEW FAM</Link>
  </div>
);

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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
