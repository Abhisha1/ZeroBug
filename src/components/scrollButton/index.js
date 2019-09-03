import React, { Component } from "react";
import "./scrollButton.scss";


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
			    <button className="scrollButton" onClick={this.handleClick}>Scroll Down
                </button>
            </div>
		);
	}
}

export default ScrollButton;