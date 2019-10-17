import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import './card.scss'

/**
 * A modular card component implemented according to specifications discussed
 * in our UI designs
 */


class Cards extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const date = new Date().toDateString();
        return (
            <div>
            <Box boxShadow={3} height="100%" width="100%">
              <Card class= "card">
                    <CardActionArea href={this.props.link}>
                      <CardMedia
                        style={{height: 0, paddingTop: '56.25%'}}
                        image="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                        title="Contemplative Reptile"
                      />
                      </CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.artifactName}
                        </Typography>
                        <Divider/>
                        <Typography variant="body 1" component="p">
                          {this.props.description}
                        </Typography>
                        <div style={{position: "absolute", bottom: 0, left: 0, margin:20}}>
                            <Typography colour="secondary">
                                {date}
                            </Typography>
                        </div>
                      </CardContent>
                  </Card>
              </Box>
            </div>
        );
    }
}
export default Cards;
