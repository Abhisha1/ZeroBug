import React, { Component } from "react";
import {CardDeck, Card} from "react-bootstrap";
import './customdeck.scss';
class CustomDeck extends Component{
    render(){
        let cardImg = require('../../assets/bg2.jpg');
        return(
            <CardDeck id="cardDeck">
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