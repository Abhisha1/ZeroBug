import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import FamilySlider from "./cardSlider";


class RenderArtefacts extends Component{
    constructor(props){
        super(props);
        this.state = {
            artefactList: null,
            username: null,
            dataReady: false,
            cardData: null,
        }
    }

    // get the families that the user managed
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({username: user.displayName});
                this.props.firebase.getArtefactData(this, this.state.username);
            }
        })
    }

    render(){
        return(
            <div>
                hello
            </div>
        );
    }
}
const renderThings = withRouter(withFirebase(RenderArtefacts));
export default RenderArtefacts;
