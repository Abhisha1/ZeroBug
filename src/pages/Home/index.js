import React, { Component } from "react";
import "./home.scss";
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

class Home extends Component {

	render() {
		return(
			<div className="homepage">
                <h1>A family artefact register.</h1>
				<h3>Safe.Secure.Shareable</h3>

					<div class="parallax"></div>

					<div className="text_container">
					<p>
						A software solution developed by ZeroBugs to help families share artefacts securely online.
						

						To get started, <Link to={ROUTES.SIGN_UP}> sign up here</Link>
					</p>
					</div>
			</div>
		);
	}
}

export default Home;