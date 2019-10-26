import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import './plusCard.scss'
import plusIcon from "../../assets/plusIcon.png";

/**
 * Place holder card to add new artefacts
 */

class PlusCard extends Component{


    render(){
        return(
            <div>
                <Box boxShadow={3} height="100%" width="100%">
                    <Card className="plusCard">
                        <CardActionArea href="/createartefact">
                            <CardMedia
                              style={{height: 0, paddingTop: '100%'}}
                              image= {plusIcon}
                              title={this.props.artefactName}
                            />
                            <Typography variant="h6" align="center">
                                Add New Artefact!
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Box>
          </div>
        );
    }
}

export default PlusCard;
