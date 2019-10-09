import React, { Component } from "react";
import Cards from "./../../components/Card";
import { withAuthorization } from '../Session';


class HomePage extends Component {
    render(){
        return(
          <div>
            <Cards/>
          </div>
        );
    }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
