import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';

class ImageUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            imageURL: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange = e => {
        if(e.target.files[0]){
            const file = e.target.files[0];
            //console.log(file);
            this.setState({... this.state, image: file})
        }
    }

    handleUpload = () => {
        const {image} = this.state;

        //here give the artifactName
        const uploadTask = this.props.firebase.uploadthings(image, this, "artifactName");


    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <br/>
                <img src={this.state.imageURL} alt="Uploaded images" height="120" width="330"/>
                
            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;