import React, { Component } from "react";
import "./account.scss";
import RenderFamilies from "./renderFamilies";
import { withAuthorization } from "../../components/Session";
import Paper from '@material-ui/core/Paper';
import Profile from "./profile";


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
				<Paper id="familyPaper">
					<div>
						<RenderFamilies />
					</div>
				</Paper>
			</div>	
		);
	}
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
