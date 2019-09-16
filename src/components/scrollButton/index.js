import React, { Component } from "react";
import "./scrollButton.scss";
import {IoIosArrowDropdownCircle} from "react-icons/io";


class ScrollButton extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let element = document.getElementById("about-card");
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

	render() {
		return(
            <div>
			    <button className="scrollButton" onClick={this.handleClick}><IoIosArrowDropdownCircle size={40} color='white'></IoIosArrowDropdownCircle>
                </button>
            </div>
		);
	}
}

export default ScrollButton;