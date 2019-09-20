import React, { Component } from "react";
import {CardDeck, Card} from "react-bootstrap";
class CustomDeck extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let cardImg = require('../../assets/bg2.jpg');
        return(
            <CardDeck>
            {this.props.cards.map(item => (
                <Card key={item.name}>
                <Card.Img variant="top" src={cardImg} />
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                </Card.Body>
            </Card>
            ))}
            </CardDeck>
        )
    }
}
export default CustomDeck;