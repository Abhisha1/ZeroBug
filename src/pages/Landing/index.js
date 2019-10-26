import React, { Component } from "react";
import "./landing.scss";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ScrollButton from "../../components/scrollButton";


/**
 * The landing page for ZeroBug
 */
class LandingPage extends Component {

	// Renders a short description of web app
	render() {
		return (
			<Grid container justify="center">
				<Grid item style={{ width: '100%' }} id="parallaxTry">
					<h1 id="title-landing">A family artefact register.</h1>
					<h3 id="subtitle-landing">Safe. Secure. Shareable</h3>
					<ScrollButton newElementInView="about-card"></ScrollButton>
				</Grid>
				<Grid item style={{ width: '100%',justifyContent: "center", textAlign: "center"}} id="parallaxTry">
					<p id="about-card">
						A software solution developed by ZeroBug to help families share artefacts securely online.
					</p>
					
					<Button variant="contained" href="/signup" style={{ backgroundColor: "#ffeb3b" }}>
						Get started
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default LandingPage;
