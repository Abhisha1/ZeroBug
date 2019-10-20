import React, { Component } from "react";
import "./landing.scss";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
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
							<p align="center">
							A software solution developed by ZeroBugs to help families share artefacts securely online.
							</p>
						</div>
						<Grid container justify="center">
							<Grid item>
								<Button variant="contained" href="/signup" allign="center" style={{backgroundColor: "#ffeb3b"}}>
									Get started
								</Button>
							</Grid>
						</Grid>
					</div>
					</div>


			</div>
		);
	}
}

export default LandingPage;
