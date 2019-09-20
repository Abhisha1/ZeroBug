import React, { Component } from "react";
import {CardDeck, Card} from "react-bootstrap";
import {MdPersonPinCircle} from "react-icons/md";
class CustomDeck extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <CardDeck>
            {this.props.cards.map(item => (
                <Card key={item.name}>
                <Card.Img variant="top"/>
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