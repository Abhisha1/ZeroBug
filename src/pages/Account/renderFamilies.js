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
					<h1 id="account-heading">Manage Your Families</h1>
                    {this.state.dataReady && (this.state.cardData ? <FamilySlider cards={this.state.cardData}
					/> : <h5 id="noFamilyCreatedMessage">You have not created any families yet.</h5>) 
                    
                    }
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;
