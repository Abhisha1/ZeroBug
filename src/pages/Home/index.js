import React, { Component } from "react";
import Cards from "./../../components/Card";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withAuthorization } from "./../../components/Session";
import RenderFamilies from "./renderFamilies";
import "./container.scss"



class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            artefactList: null,
            uid: null,
            dataReady: false,
            cardData: [],
        }
    }
    componentDidMount =() => {
        this.props.firebase.auth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({uid: user.uid});
                this.props.firebase.getArtefactData(this, this.state.uid);
            }
        })

    }

    render(){
        console.log(this.state.uid);
        if(this.state.dataReady){
            this.state.artefactList.map(item=> (
                <div key={item}>
                    {this.state.cardData.push(<Cards artefactName={item.name.artefactName} description={item.name.artefactBrief} date={item.name.date}/>)}
                </div>
            ));
        }
        console.log(this.state.dataReady, this.state.artefactList, this.state.cardData);
        return(


            <div>
              <div>
                <RenderFamilies/>
              </div>
                <Divider />
                <h1 id="account-heading">Artefacts</h1>
                <div class="textboxContainer">
                    <TextField className="textbox" type="search" margin-right="20px" placeholder="Search for Artefact"/>
                </div>
                <div class="container">
                    {this.state.cardData}
                </div>
            </div>

        );

    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
