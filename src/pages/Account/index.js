import React, { Component } from "react";
import "./account.scss";
import UploadFile from "../../components/ImageUpload";
import { FirebaseContext } from "../../components/Firebase";
import RenderFamilies from "./renderFamilies";

import ArtefactSlider from "./cardSlider";
import Profile from "./profile";

import { withAuthorization } from "../../components/Session";



class AccountPage extends Component {

	state = {
		familiesOwned: null,
	}



	render() {
		return (
	

			<div id="profileContainer">

				<div>
					<Profile />
				</div>

				<div>
					<RenderFamilies />
				</div>
{/** 
				<div id="artifactWrapper">
					<h1 id="account-heading">Artifacts Owned</h1>
					<ArtefactSlider cards={
							[1, 2, 3, 4, 5, 6]
					} />
				</div>
*/}


			</div>

			
		);
	}
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
