import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import FamilySlider from "./cardSlider";

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
                this.props.firebase.getYourManagedFamilyName(this, this.state.username);
            }
        })  
    }

    render(){

        return(
            <div>
                <div id="familiesWrapper">
					<h1 id="account-heading">Your Managed Families</h1>
                    <FamilySlider cards=
                        {this.state.dataReady?
                            this.state.cardData:[]
                        }
					/>
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;