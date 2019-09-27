import React, { Component } from "react";
import "./account.scss";
import {FirebaseContext} from "../../components/Firebase";

class AccountPage extends Component {

    render() {
		return(
			<div id="profileContainer">
				<div id="topWraper">
					<h1 id="account-heading">Your Profile</h1>
					<div id="topContainer">
						<div id="avatarContainer">
							<img id="avatarBox"></img>
							<button className="aButton">Change Avatar</button>
						</div>
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

				<div id="familiesWrapper">
					<h1 id="account-heading">Manage Families</h1>
					<div id="familiesContainer">
						<div id="familyItems">
							<div className="familyOwned">
								yooooooo
							</div>
							<div className="familyOwned">
								yooooooo
							</div>
							<div className="familyOwned">
								yooooooo
							</div>
							<div className="familyOwned">
								yooooooo
							</div>
							<div className="familyOwned">
								yooooooo
							</div>
							<div className="familyOwned">
								yooooooo
							</div>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}

export default AccountPage;