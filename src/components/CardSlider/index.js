import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import GroupIcon from '@material-ui/icons/Group';
import 'slick-carousel/slick/slick.css';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./customslider.scss";

/**
 * The CustomSlider class which renders list of families
 * horizontally
 */
class CustomSlider extends Component {
  settings = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "60px",
    infinite: false,
    arrows: true,
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


  /**
   * Renders the slider onto the webpage
   */
  render() {

    let slickSlider = <Slider id="customSlider" {...this.settings} ref={c => { this.slickSlider = c }}>

      {/* Passes through families data to render in slider */}
      {this.props.cards.map(item => (
        <div key={item} id="sliderCard">
          {item.photoURL ? <Avatar style={{margin: "1vw", width: "10vw", height:"10vw"}} className="memberAvatar" aria-label=""
            src={item.photoURL}
          /> : <GroupIcon className="memberAvatar" aria-label=""></GroupIcon>}
          <h4 id="memberName">
              {item.displayName}
            </h4>
        </div>
      ))}
    </Slider>

    return (
      <Grid id="sliderGrid">
        {slickSlider}
      </Grid>
    )
  }
}

export default CustomSlider;
