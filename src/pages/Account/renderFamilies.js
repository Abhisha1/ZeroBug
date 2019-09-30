import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';

class RenderFamilies extends Component{
    constructor(props){
        super(props);
        this.state = {
            familyList: null,
        }
    }

    componentDidMount =() => {
        const renderfam = this.props.firebase.getListFamilyName(this);
   
    }

    render(){
        return(
            <div>
                <div id="familiesWrapper">
					<h1 id="account-heading">Manage Families</h1>
					<div id="familiesContainer">
						<div id="familyItems">
                            {(this.state.familyList || []).map(item => (
                                <div className="familyOwned"><p>Jessica Test in this family groups: {item}</p></div>
                            ))}
						</div>
					</div>
				</div>
            </div>
        )
    }
}
const renderThings = withRouter(withFirebase(RenderFamilies));
export default renderThings;