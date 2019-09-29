import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import './card.scss'
const useStyles = makeStyles({
  card: {
    maxWidth: 205,
  },
  media: {
    height: 140,
  },
});


class Cards extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const classes = useStyles;
        return (
            <div>
              <Card class= "card">
                <CardActionArea>
                  <CardMedia
                    style={{height: 0, paddingTop: '56.25%'}}
                    image="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
        );
    }
}
export default Cards;
