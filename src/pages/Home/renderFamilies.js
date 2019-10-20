import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import FamilySlider from "./cardSlider";
import "./container.scss";

class RenderFamilies extends Component{
    constructor(props){
        super(props);
        this.state = {
            familyList: null,
            username: null,
            familyImageURL: [],
            dataReady: false,
            cardData: null,
        }
    }

    // get the families that the user managed
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({username: user.displayName});
                this.props.firebase.getYourFamilyNames(this, this.state.username);
            }
        })
    }

    render(){
        return(
            <div>
                <div id="familiesWrapper">
					<h1 id="account-heading">Families</h1>
                    {this.state.dataReady ? <FamilySlider cards={this.state.cardData
                        }></FamilySlider> : <h6 id="noFamilyMessage">You don't have any families just yet. To get started, <Link to={{pathname:'/create-family'}}>create a new family</Link></h6>}
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;
