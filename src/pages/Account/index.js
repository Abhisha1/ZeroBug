import React, { Component } from "react";
import "./account.scss";
import ImageUpload from "./imageUpload";
import {FirebaseContext} from "../../components/Firebase";

class AccountPage extends Component {

    render() {
		return(
			<div id="profileContainer">
				

				<div>
				<ImageUpload />
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