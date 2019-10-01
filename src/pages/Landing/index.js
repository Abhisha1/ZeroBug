import React, { Component } from "react";
import "./landing.scss";
import Button from "../../components/Button";
import ScrollButton from "../../components/scrollButton";
import * as ROUTES from '../../constants/routes';

class LandingPage extends Component {

	render() {
		return(
			<div id="landingpage">

					<div className="parallax">
					<h1 id="title-landing">A family artefact register.</h1>
					<h3 id="subtitle-landing">Safe. Secure. Shareable</h3>
					<ScrollButton newElementInView="about-card"></ScrollButton>

					</div>

					
					<div className="parallax">
					</div>
					<div className="parallax">
					<div className="about-card" id="about-card">
						<div className="card_text">
							<p>
							A software solution developed by ZeroBugs to help families share artefacts securely online.
							</p>
						</div>
						<Button variant="primary" target={ROUTES.SIGN_UP} value="Get started"></Button>
					</div>
					</div>


			</div>
		);
	}
}

export default LandingPage;