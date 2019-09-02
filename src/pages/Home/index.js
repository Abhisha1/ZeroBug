import React, { Component } from "react";
import "./home.scss";
import {Card, Button} from 'react-bootstrap';

import * as ROUTES from '../../constants/routes'

class Home extends Component {

	render() {
		return(
			<div className="homepage">
                <h1>A family artefact register.</h1>
				<h3>Safe.Secure.Shareable</h3>

					<div className="parallax">

					<Card className="card">
					<Card.Body>
						<Card.Text className="card_text">
						A software solution developed by ZeroBugs to help families share artefacts securely online.
						

						</Card.Text>
						<Button className="redirect_button" variant="primary" href={ROUTES.SIGN_UP}>Get started</Button>
					</Card.Body>
					</Card>

					</div>

					{/* <div className="text_container"> */}
					
					<div className="parallax"></div>
			</div>
		);
	}
}

export default Home;