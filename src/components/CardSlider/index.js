import React, { Component } from "react";
import { MdPeople } from "react-icons/md";
import Slider from "react-slick";
import Avatar from "@material-ui/core/Avatar"
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
      dots: true,
      speed: 400,
      slidesToShow: this.props.cards.length < 4 ? this.props.cards.length : 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: this.props.cards.length < 3 ? this.props.cards.length : 2,
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



    return (
      <div id="slider">
        <Slider {...settings}>

          {/* Passes through users data to render in slider */}
          {this.props.cards.map(item => (
            <div key={item} id="sliderCard">
              <Avatar alt="memberAvatar" id="memberAvatar" src={item.photoURL} />
              <h5 id="memberName">{item.displayName}</h5>
            </div>
          ))}

        </Slider>
      </div>
    )
  }
}
export default CustomSlider;