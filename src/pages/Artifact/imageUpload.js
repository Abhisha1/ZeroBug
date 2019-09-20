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
            this.setState({... this.state, image: file})
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = this.props.firebase.uploadthings(image);
        const url = this.props.firebase.getURL(this,'images/'+image.name);
      //  console.log(image.name);
       // console.log(url);

    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <img src={this.state.imageURL} alt="Uploaded images" height="360" width="680"/>
                
            </div>
        )
    }
}
const UploadFile = withRouter(withFirebase(ImageUpload));
export default UploadFile;