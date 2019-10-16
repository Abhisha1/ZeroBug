import React, { Component } from "react";
import Slider from "react-slick";
import Avatar from "@material-ui/core/Avatar";
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
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
    const  settings = {
      dots: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerPadding: "60px",
      infinite: false,
      swipe: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
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
      <div id="customSlider">
        <Slider {... settings}>

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