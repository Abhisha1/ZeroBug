import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import { Timestamp } from '@google-cloud/firestore';
import './card.scss'

/**
 * A modular card component implemented according to specifications discussed
 * in our UI designs
 */


class Cards extends Component{

    convertDate = (date) => {
        let newDate = new Timestamp(date["seconds"], date["nanoseconds"])
        return newDate.toDate().toDateString();
    }

    render(){

        let date = this.props.date;
        return (
            <div>
            <Box boxShadow={3} height="100%" width="100%">
              <Card class= "card">
                    <CardActionArea href={this.props.link}>
                      <CardMedia
                        style={{height: 0, paddingTop: '56.25%'}}
                        image="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                        title={this.props.artefactName}
                      />
                     </CardActionArea>

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.artefactName}
                        </Typography>
                        <Divider/>
                        <Typography variant="body 1" component="p">
                          {this.props.description}
                        </Typography>

                      </CardContent>

                      <div style={{position: "absolute", bottom: 0, left: 0, margin:20}}>
                          <Typography color="textSecondary">
                              {this.convertDate(date)}
                          </Typography>
                      </div>
                  </Card>
              </Box>
            </div>
        );
    }
}
export default Cards;
