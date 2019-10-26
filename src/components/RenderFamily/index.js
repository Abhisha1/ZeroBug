import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import FamilySlider from "./cardSlider";
import { Link } from 'react-router-dom';
/**
 * A modular class that handle render families for account page and the home page.
 */
class RenderFamilies extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: null,
            dataReadyYour: false,
            dataReadyManage: false,
            cardDataYour: null,
            cardDataManage: null,
        }
    }

    /**
     * Get the families that the user managed or ownned
     */
    componentDidMount =() => {
        if (this.props.page === "accountPage"){
            this.props.firebase.auth.onAuthStateChanged((user)=>{
                if(user){
                    this.setState({username: user.displayName});
                    this.props.firebase.getYourManagedFamilyName(this, this.state.username);
                }
            })
        } else {
            this.props.firebase.auth.onAuthStateChanged((user)=>{
                if(user){
                    this.setState({username: user.displayName});
                    this.props.firebase.getYourFamilyNames(this, this.state.username);
                }
            })
        }      
    }

    render(){
        return(
            <div>
                {this.props.page === "accountPage" ? (
                    <div id="familiesWrapper">
					<h1 id="account-heading">Manage Your Families</h1>
                    {this.state.dataReadyManage ? <FamilySlider cards={this.state.cardDataManage}
					/> : <h5 id="noFamilyCreatedMessage">You have not created any families yet.</h5> }
				    </div>
                ): 
                    <div id="familiesWrapper">
                    <h1 id="account-heading">Families</h1>
                    {this.state.dataReadyYour ? <FamilySlider cards={this.state.cardDataYour
                        }></FamilySlider> : <h6 id="noFamilyMessage">You don't have any families just yet. To get started, 
                        <Link to={{pathname:'/create-family'}}>create a new family</Link></h6>}
                     </div>
                }
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;