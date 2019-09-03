import React, { Component } from "react";
import "./button.scss";


class Button extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log(this.props.target);
        window.location = this.props.target;
    }

	render() {
		return(
            <div>
			    <button type="button" variant={this.props.variant} onClick={this.handleClick}>{this.props.value}</button>
            </div>
		);
	}
}

export default Button;