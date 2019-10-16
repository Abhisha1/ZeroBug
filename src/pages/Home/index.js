
import React, { Component } from "react";
import Cards from "./../../components/Card";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./container.scss"

import {Link} from 'react-router-dom';
import { withAuthorization } from "./../../components/Session";
import RenderFamilies from "./renderFamilies";

const styles = makeStyles(theme => ({
   paper: {
   padding: 30,
   display: 'flex',
   overflow: 'auto',
   flexDirection: 'row',
},
}));

class HomePage extends Component {


    render(){
        return(
            <div>
              <div>
                <RenderFamilies/>
              </div>
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
