import React, { Component } from "react";
import "./button.scss";
/**
 * A modular button component implemented using the colour
 * pallete and design chosen for the project.
 */

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * Handles the button click event through redirecting to specific webpage
     */
    handleClick() {
        window.location = this.props.target;
    }
    /**
     * @return Renders the button to webpage
     */
    render() {
        return (
            <div>
                <button type="button" variant={this.props.variant} onClick={this.handleClick}>{this.props.value}</button>
            </div>
        );
    }
}

export default Button;