import React, { useEffect } from 'react';
import ListRocketsForm from './RocketsForms/ListRocketsForm';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadRocketsList, loadRocketsListByFilter } from '../../../store/pages/rockets/actions/rocketActions';
import isEmpty from 'lodash/isEmpty';
import util from '../../util';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		marginTop: '16px',
		padding: '0',
	},
	list: { padding: 16, backgroundColor: '#2D566A', '&:hover': { backgroundColor: '#227587', textDecoration: 'none' } },
	textColor: {
		color: '#f7f7f7',
	},
	description: { width: '70%', margin: '0px', color: '#f7f7f7' },
	link: { color: '#f7f7f7', textDecoration: 'none', cursor: 'pointer' },
}));

const ListRockets = (props) => {
	const classes = useStyles();
	const location = useLocation();

	useEffect(() => {
		props.loadRocketsList();
	}, [location.pathname]);

	const truncate = (str, max, suffix) =>
		str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

	const handleFormSubmit = (values) => {
		props.loadRocketsListByFilter(values);
	};

	return (
		<div className="content-wrap">
			<Container maxWidth="xl">
				<Box>
					<ListRocketsForm handleFormSubmit={handleFormSubmit} />
				</Box>
				<Grid container>
					<List className={classes.root}>
						{!isEmpty(props.rockets) &&
							props.rockets.map((rocket) => {
								return (
									<Box className="st-box" mb={2} key={rocket.id}>
										<Box className="box-left" mb={2}>
											<Box mb={1}>
												<h2>{rocket.rocket_name}</h2>
											</Box>
											<Box mb={3}>
												<span>{truncate(rocket.description, 150, '...')}</span>
											</Box>

											<span>
												<Link to={'/rockets/' + rocket.rocket_id} className={classes.link}>
													Details
												</Link>
											</span>
										</Box>
										<Box className="box-right">
											<img height={140} src={rocket.flickr_images[0]} alt="rockets" />
										</Box>
									</Box>
								);
							})}
					</List>
				</Grid>
			</Container>
		</div>
	);
};

export default connect(
	(state) => ({
		rockets: state.rocketReducer.rockets,
	}),
	{
		loadRocketsList,
		loadRocketsListByFilter,
	}
)(ListRockets);
