import React, { Component } from "react";
import "./scrollButton.scss";
import { IoIosArrowDropdownCircle } from "react-icons/io";

/**
 * Creates a smooth scrolling button which moves to a new element on page
 */
class ScrollButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Scrolls to the element on page with particular id given by props
     */
    handleClick() {
        let element = document.getElementById(this.props.newElementInView);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    /**
     * Renders scroll button onto webpage
     */
    render() {
        return (
            <div>
                <button className="scrollButton" onClick={this.handleClick}><IoIosArrowDropdownCircle size={40} color='white'></IoIosArrowDropdownCircle>
                </button>
            </div>
        );
    }
}

export default ScrollButton;