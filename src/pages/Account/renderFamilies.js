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
        }
    }

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
                    <FamilySlider cards={
							(this.state.familyList || [])
					} />
				{/** 	<div id="familiesContainer">
						<div id="familyItems">
                            {(this.state.familyList || []).map(item => (
                                <div className="familyOwned" key={item}>
                                    <p key={item.name}>{item}</p></div>
                            ))}
                        </div>
                        
					</div> */}
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;