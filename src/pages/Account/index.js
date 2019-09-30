import React, { Component } from "react";
import "./account.scss";
import ImageUpload from "./imageUpload";
import {FirebaseContext} from "../../components/Firebase";
import RenderFamilies from "./renderFamilies";

class AccountPage extends Component {

	state = {
		familiesOwned: null,
	}

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

				<div>
				<RenderFamilies />
				</div>




				
			</div>

			
			
		);
	}
}

export default AccountPage;