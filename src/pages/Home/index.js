import React, { Component } from "react";
import Cards from "./../../components/Card";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import "./container.scss"




class HomePage extends Component {

     var styles = makeStyles(theme => ({
        paper: {
        padding: 30,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    }));

    render(){
        return(
            <Paper className={classes.paper}>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
          </Paper>
        );

    }
}

export default HomePage;
