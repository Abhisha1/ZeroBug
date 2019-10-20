import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import FamilySlider from "./cardSlider";

class RenderFamilies extends Component{
    constructor(props){
        super(props);
        this.state = {
            familyList: null,
            username: null,
            familyImageURL: [],
            dataReady: false
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

        let cardData = []

        if(this.state.dataReady){
            for(let i = 0; i < this.state.familyList.length; i++){
                cardData.push(
                    {
                        avatar: this.state.familyImageURL[i],
                        name: this.state.familyList[i]
                    }
                )
            }
        }

        return(
            <div>
                <div id="familiesWrapper">
					<h1 id="account-heading">Your Managed Families</h1>
                    <FamilySlider cards={
                            cardData
					}/>
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;
