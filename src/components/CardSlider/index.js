import React, { Component } from "react";
import { MdPeople } from "react-icons/md";
import Slider from "react-slick";
import Cards from "../Card";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './customslider.scss';

/**
 * The CustomSlider class which renders list of users
 * horizontally 
 */
class CustomSlider extends Component {

  /**
   * Renders the slider onto the webpage
   */
  render() {
    // initialises configuration for formatting of slider
    const settings = {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: true
    };



    return (
      <div id="slider">
        <Slider {...settings}>

          {/* Passes through users data to render in slider */}
          {this.props.cards.map(item => (
            <div key={item} id="sliderCard">
              <img alt="memberAvatar" id="memberAvatar" src={item.photoURL} />
              <h5 id="memberName">{item.displayName}</h5>
            </div>
          ))}

        </Slider>
      </div>
    )
  }
}
export default CustomSlider;