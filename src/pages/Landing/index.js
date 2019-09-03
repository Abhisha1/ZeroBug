import React, { Component } from "react";
import "./landing.scss";
import Button from "../../components/Button";
import ScrollButton from "../../components/scrollButton";
import * as ROUTES from '../../constants/routes';

class LandingPage extends Component {

	render() {
		return(
			<div className="landingpage">

					<div className="parallax">
					<h1>A family artefact register.</h1>
					<h3>Safe. Secure. Shareable</h3>
					<ScrollButton></ScrollButton>

					</div>

					
					<div className="parallax">
					<div className="about-card" id="about-card">
						<div className="card_text">
							<p>
							Historically, family artefacts are something that are treasured by the older generations, and passed on when
							the time is right. This is done so by the physical transfer of priceless family heirlooms. But what happens, when
							families are dispersed across the globe? How do we preserve our family traditions and heritage through invaluable 
							artefacts when we cannot physically transfer them?
							</p><p>
							ZeroBugs recognises this as a problem that many families face and has developed a software solution to help store,
							share and track family artefacts!
							</p><p>
							This application allows users to create families online, upload artefacts digitally and share them to family members
							and groups. This means you can view your families artefacts anywhere, anytime and at any place!
							</p><p>
							A software solution developed by ZeroBugs to help families share artefacts securely online.
							</p>

						</div>
						<Button variant="primary" target={ROUTES.SIGN_UP} value="Get started"></Button>
					</div>
					</div>
					<div className="parallax"></div>


			</div>
		);
	}
}

export default LandingPage;