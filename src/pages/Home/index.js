import React, { Component } from "react";
import Cards from "./../../components/Card";
import PlusCard from "./../../components/plusCard";
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
            plusCardAdded: false,
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
///////RANDOM COMMENT
    render(){
        if(this.state.dataReady){
            this.state.artefactList.map(item=> (
                <div key={item}>
                    {this.state.cardData.push(<Cards artefactName={item.name.artefactName}
                         description={item.name.artefactBrief} date={item.name.date}
                         image={item.name.imagesURL[0]}/>)}
                </div>
            ));
            if(this.state.plusCardAdded===false){
                this.state.cardData.push(<PlusCard/>);
                this.state.plusCardAdded=true;
            }
        }
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
