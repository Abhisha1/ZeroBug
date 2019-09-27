import React, { Component } from "react";
import {CardDeck, Card, Carousel, CarouselItem} from "react-bootstrap";
import {MdPeople} from "react-icons/md";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './customslider.scss';

/**
 * The CustomSlider class
 */
class CustomSlider extends Component{
    render(){
        const settings = {
            dots: true,
            speed: 400,
            slidesToShow: this.props.cards.length <4 ? this.props.cards.length : 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: this.props.cards.length <3 ? this.props.cards.length : 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        console.log(this.props.cards);
        return(
            <div id="slider">
            <Slider {...settings}>
                {this.props.cards.map(item => (
                    <div key={item} id="sliderCard">
                        <MdPeople id="memberAvatar"></MdPeople>
                        <h5 id="memberName">{item.name}</h5>
                    </div>
                ))}
            </Slider>
            </div>
            // <Carousel id="cardDeck">
            // {this.props.cards.map(item => (
            //     <Carousel.Item key={item.name}>
            //         hjfbjdbgbgys
            //     {/* <MdPeople></MdPeople> */}
            //     <Carousel.Caption>
            //         <p>cdtcvdwgdscsdg</p>
            //     <h3>{item.name}</h3>
            //     </Carousel.Caption>
            // </Carousel.Item>
            // ))}
            // </Carousel>
        )
    }
}
export default CustomSlider;