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

    showNone(){
        this.setState({plusCardAdded :true});
        return(<PlusCard />)
    }


///////RANDOM COMMENT
    render(){
        let artefacts = (<div class="container">
            {this.state.dataReady && 
            this.state.artefactList.map(item=> (
                <div key={item.name.artefactName}>
                    <Cards key={item.name.artefactName} artefactName={item.name.artefactName}
                         description={item.name.artefactBrief} date={item.name.date}
                         image={item.name.imagesURL[0]}/>
                </div>
            ))}
            {!this.state.artefactList && <PlusCard />}
        </div>)
        return(


            <div>
              <div>
                <RenderFamilies/>
              </div>
                <Divider />
                <h1 id="account-heading">Artefacts</h1>
                <div className="textboxContainer">
                    <TextField className="textbox" type="search" margin-right="20px" placeholder="Search for Artefact"/>
                </div>
                <div className="container">
                    {artefacts}
                </div>
            </div>

        );

    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
