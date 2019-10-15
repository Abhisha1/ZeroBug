import React, { Component } from "react";
import "./account.scss";
import UploadFile from "../../components/ImageUpload";
import { FirebaseContext } from "../../components/Firebase";
import RenderFamilies from "./renderFamilies";

class AccountPage extends Component {

	state = {
		familiesOwned: null,
	}

	render() {
		return (
			<div id="profileContainer">


					<div id="topWraper">
						<h1 id="account-heading">Your Profile</h1>
						<div id="topContainer">
							<UploadFile dbLocation="profileImages/" isCreate={false} name="Jessica Test"/>
							<div id="profileInformationContainer">
								<h2 id="profile-name">Name</h2>
								<button className="aButton" id="changePasswordButton">Change Password</button>
							</div>
						</div>
					</div>



				<div id="artifactWrapper">
					<h1 id="account-heading">Artifacts Owned</h1>
					<div id="artifactContainer">
						<div id="artifactItems">
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
							<div className="artifactOwned">
								yooooooo
							</div>
						</div>
					</div>
				</div>

				<div>
					<RenderFamilies />
				</div>





			</div>



		);
	}
}

export default AccountPage;