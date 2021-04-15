import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRocket } from '../../../store/pages/rockets/actions/rocketActions';

const useStyles = makeStyles((theme) => ({
	fullWidth: {
		width: '100%',
	},
	boxStyle: {
		backgroundColor: '#330065',
		margin: '0px',
		color: '#f7f7f7',
		padding: '10px',
	},
	gridStyle: { padding: '10px 5px 0 5px' },
	textColor: {
		color: '#f7f7f7',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
}));

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

const ViewRocket = (props) => {
	const classes = useStyles();
	const { id } = useParams();
	const location = useLocation();
	const [windowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		props.loadRocket(id);
	}, [location.pathname]);

	let headerList = [{ link: location.pathname, label: 'ddd' }];

	// Put the object into storage
	localStorage.setItem('headerList', JSON.stringify(headerList));

	const renderDescription = (description, wikiLink) => {
		return (
			<Grid container>
				<Grid item xs={12} sm={12} className={classes.gridStyle}>
					<Box className={classes.boxStyle}>
						<span>{description}</span>
						<Box mt={5}>
							<span>
								<Link href={wikiLink}>{wikiLink}</Link>
							</span>
						</Box>
					</Box>
				</Grid>
			</Grid>
		);
	};

	return (
		<div className="content-wrap">
			<Container maxWidth="xl">
				<div className="flex-container">
					<div className="flex-box">
						<Grid container>
							<Grid item xs={6} sm={6} className={classes.gridStyle}>
								<Box className={classes.boxStyle}>
									<span className="box-label">Rocket name</span>
									<h2>{props.rocket && props.rocket.rocket_name}</h2>
								</Box>
							</Grid>
							<Grid item xs={6} sm={6} className={classes.gridStyle}>
								<Box className={classes.boxStyle}>
									<span className="box-label">Rocket type</span>
									<h2>{props.rocket && props.rocket.rocket_type}</h2>
								</Box>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={6} sm={6} className={classes.gridStyle}>
								<Box className={classes.boxStyle}>
									<span className="box-label">Status</span>
									<h2>{props.rocket && props.rocket.active ? 'Active' : 'Inactive'}</h2>
								</Box>
							</Grid>
							<Grid item xs={6} sm={6} className={classes.gridStyle}>
								<Box className={classes.boxStyle}>
									<span className="box-label">Stages</span>
									<h2>{props.rocket && props.rocket.stages}</h2>
								</Box>
							</Grid>
						</Grid>

						{windowDimensions.width > 1000 ? (
							<React.Fragment>
								<Grid container>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<Box className={classes.boxStyle}>
											<span className="box-label">Height</span>
											<h2>{props.rocket && props.rocket.height.meters + 'm'}</h2>
										</Box>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<Box className={classes.boxStyle}>
											<span className="box-label">Diameter</span>
											<h2>{props.rocket && props.rocket.diameter.meters + 'm'}</h2>
										</Box>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<Box className={classes.boxStyle}>
											<span className="box-label">Mass</span>
											<h2>{props.rocket && props.rocket.mass.kg + 'kg'}</h2>
										</Box>
									</Grid>
								</Grid>

								{props.rocket && renderDescription(props.rocket.description, props.rocket.wikipedia)}
							</React.Fragment>
						) : null}
					</div>

					<div className="flex-box">
						<Grid container>
							<Grid item xs={12} sm={12} className={classes.gridStyle}>
								<img className={classes.image} src={props.rocket && props.rocket.flickr_images[0]} alt="rockets" />
							</Grid>
						</Grid>

						{windowDimensions.width > 1000 ? (
							<React.Fragment>
								<Grid container>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<img
											className={classes.image}
											src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg"
											alt="rockets"
										/>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<img
											className={classes.image}
											src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg"
											alt="rockets"
										/>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<img
											className={classes.image}
											src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg"
											alt="rockets"
										/>
									</Grid>
								</Grid>

								<Grid container>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<img
											className={classes.image}
											src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg"
											alt="rockets"
										/>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.gridStyle}>
										<img
											className={classes.image}
											src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg"
											alt="rockets"
										/>
									</Grid>
								</Grid>
							</React.Fragment>
						) : (
							props.rocket && renderDescription(props.rocket.description, props.rocket.wikipedia)
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default connect((state) => ({ rocket: state.rocketReducer.rocket }), {
	loadRocket,
})(ViewRocket);
