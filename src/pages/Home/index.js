import React, { Component } from "react";
import Cards from "./../../components/Card";
import PlusCard from "./../../components/plusCard";
import TextField from '@material-ui/core/TextField';
import { withAuthorization } from "./../../components/Session";
import "./container.scss"
import Paper from '@material-ui/core/Paper';
import RenderFamilies from "../../components/RenderFamily";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artefactList: [],
            uid: null,
            dataReady: false,
            cardData: [],
            plusCardAdded: false,
        }
    }
    componentDidMount = () => {
        this.props.firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid });
                this.props.firebase.getArtefactData(this, this.state.uid);
            }
        })
    }
    handleSearch = e => {
        this.props.firebase.getArtefactData(this, this.state.uid);
        let newArtefacts = [];   
        this.state.artefactList.map(artefact => {
            if(artefact.artefactName.toLowerCase().includes(e.target.value.toLowerCase())){
                newArtefacts.push(artefact);
            }
        })
        this.setState({...this.state, searchArtifact: e.target.value, artefactList: newArtefacts});
    }





    render() {
        let artefacts = [];
        if (this.state.dataReady && this.state.artefactList){
            this.state.artefactList.map(item => (
                <div key={item.artefactName}>
                    {artefacts.push(<Cards key={item.artefactName} artefactName={item.artefactName}
                        description={item.artefactBrief} date={item.date}
                        image={item.imagesURL[0]} />)}
                </div>
            ))
        }
        artefacts.push(<PlusCard key="plus" />);
        return (


            <div>
                <h1 id="homeHeading">My Home</h1>
                <h5 id="homeInformation">View all your artefacts and families you have access to</h5>
                <Paper style={{marginLeft: "66px", marginRight: "66px", marginBottom: "66px", marginTop: "66px"}}>
                    <div>
                        <RenderFamilies page="homePage"/>
                    </div>
                </Paper>

                
                <h1 id="account-heading">Artefacts</h1>
                <div className="textboxContainer">
                    <TextField 
                    className="textbox" 
                    type="search" 
                    margin-right="20px" 
                    placeholder="Search for Artefact"
                    onChange={this.handleSearch}></TextField>
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