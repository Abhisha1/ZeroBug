import React, { Component } from "react";
import "./account.scss";
import { withAuthorization } from "../../components/Session";
import Paper from '@material-ui/core/Paper';
import Profile from "./profile";
import Artifact from "./renderArtifact";
import RenderFamilies from "../../components/RenderFamily";
/**
 * Account Page contain profile, families, artefacts sections
 */
class AccountPage extends Component {
	render() {
		return (
			<div id="profileContainer">
					<div>
						<Profile />
					</div>				
				<Paper id="familyPaper">
					<div>
						<RenderFamilies page="accountPage"/>
					</div>
				</Paper>
				<Paper id="familyPaper">
					<div>
						<Artifact/>
					</div>
				</Paper>
			</div>	
		);
	}
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
