import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRocketsList } from '../../store/pages/rockets/actions/rocketActions';
import isEmpty from 'lodash/isEmpty';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	customHeader: {
		backgroundColor: 'transparent',
		color: '#f7f7f7',
		boxShadow: 'none',
	},
	customTab: {
		color: '#7f7f7',
	},
}));

const StyledTabs = withStyles({
	indicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > span': {
			width: '100%',
			backgroundColor: '#f3f69d',
			color: '#fff',
		},
	},
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		minWidth: '130px',
		'&:focus': {
			opacity: 1,
		},
	},
}))((props) => <Tab disableRipple {...props} />);

const Header = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const location = useLocation();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// setCount(count + 1);

	console.log(props);

	let headerList = [
		{ link: '/rockets', label: 'All rockets' },
		{ link: '/rockets/falcon1dd', label: 'Falcon 1' },
	];

	// Put the object into storage
	localStorage.setItem('headerList', JSON.stringify(headerList));
	// Retrieve the object from storage
	let retrievedHeaderList = localStorage.getItem('headerList');

	let headerNavList = JSON.parse(retrievedHeaderList);

	const [headerListSState, setheaderListSState] = useState(headerNavList);

	const shortPathname = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

	console.log(headerListSState);
	console.log(location.pathname);

	let existLink = false;
	headerListSState.forEach((list) => {
		if (list.link == location.pathname) existLink = true;
	});

	let newLink = false;
	if (existLink == false && !isEmpty(props.rockets)) {
		props.rockets.forEach((rocket) => {
			if (rocket.rocket_id == shortPathname) newLink = { link: '/rockets/' + rocket.rocket_id, label: rocket.rocket_name };
		});
	}

	if (newLink != false) {
		localStorage.setItem('headerList', JSON.stringify(newLink));

		setheaderListSState([...headerListSState, newLink]);
	}

	localStorage.clear();

	return (
		<div className="header-wrap">
			<Container maxWidth="md">
				<h1>SpaceX</h1>

				<div className={classes.root}>
					<AppBar position="static" className={classes.customHeader}>
						<StyledTabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example"
						>
							{headerListSState.map((nav) => {
								return <StyledTab key={v4()} label={nav.label} component={Link} to={nav.link} />;
							})}
						</StyledTabs>
					</AppBar>
				</div>
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
	}
)(Header);
