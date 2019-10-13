import React, { Component } from "react";
import Cards from "./../../components/Card";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./container.scss"

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
