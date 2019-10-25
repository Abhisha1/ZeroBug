import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import "./account.scss";
import Cards from "./../../components/Card";
import Divider from '@material-ui/core/Divider';
/**
 * Render the Artifacts that the user manage
 */

class RenderArtifact extends Component{
    constructor(props){
        super(props);
        this.state = {
            artefactList: null,
            uid: null,
            dataReady: false,
            cardData: [],
        }
    }

    /**
     * Get the artefacts that the user managed
     */
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({uid: user.uid});
                this.props.firebase.getYourManageArtefactData(this, this.state.uid);
            }
        })
    }

    render(){

        if(this.state.dataReady){
            this.state.artefactList.map(item=> (
                <div key={item.name.artefactName}>
                    {this.state.cardData.push(<Cards key={item.name.artefactName}
                         artefactName={item.name.artefactName}
                          description={item.name.artefactBrief}
                           date={item.name.date} image={item.name.imagesURL[0]}/>)}
                </div>
            ));
        }

        return(
            <div>
                <Divider />
                <div id="artifactTop">
                    <h1 id="account-heading">Mangage Your Artefacts</h1>
                    <div className="artifactContainer">
                        {this.state.cardData}
                    </div>
                </div>
            </div>
        )
    }
}
const renderArtifact = withRouter(withFirebase(RenderArtifact));
export default renderArtifact;
