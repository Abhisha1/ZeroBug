import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
//import './customslider.scss';
import Card from "../../components/Card";

/**
 * The CustomSlider class which renders list of users
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
        arrows: false,
        swipe: true,
        nextArrow: this.nextArrow,
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
    // initialises configuration for formatting of slider
    

    let slickSlider = <Slider {...this.settings} ref={c => {this.slickSlider = c}}>

          {/* Passes through users data to render in slider */}
          {this.props.cards.map(item => (
            <div key={item} className="artifactOwned">
                <div className="oneArtifactItem">
                    <img src={item.avatar} style={{width: "100px", height: "100px", backgroundColor: "cyan"}}></img>
                    <p key={item.name}>{item.name}</p>
                </div>
            </div>
          ))}

        </Slider>
    
    let nextArrow = <button type="button" className="nextButton" onClick={() => {this.slickSlider.slickNext()}}>{">"}</button>;
    let prevArrow = <button type="button" className="nextButton" onClick={() => {this.slickSlider.slickPrev()}}>{"<"}</button>;

    return (
      <div id="artifactContainer">
          {prevArrow}
        <div id="artifactItems">
            {slickSlider}
        </div>
       {nextArrow}

      </div>
    )
  }
}
export default CustomSlider;