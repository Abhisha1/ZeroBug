import React, { Component } from "react";
import Cards from "./../../components/Card";
import "./container.scss"

class HomePage extends Component {
    render(){
        return(
          <div class="container">
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
          </div>
        );

    }
}

export default HomePage;
